import ratesData from "../../data/construction-rates.json";

export type FinishLevel = "basic" | "standard" | "premium" | "luxury";

export interface EstimateInput {
  plotArea: number;
  areaPerFloor: number;
  floors: number;
  finishLevel: FinishLevel;
}

interface RateItem {
  id: string;
  categoryId: string;
  name: string;
  unit: string;
  quantityFormula: string;
  materialRate?: number;
  labourRate?: number;
  materialRates?: Partial<Record<FinishLevel, number>>;
  fixedAllowanceRate?: number;
  finishSensitive: boolean;
  verified: boolean;
  sourceType: string;
}

interface RateCatalogue {
  metadata: {
    location: string;
    currency: string;
    status: string;
  };
  defaults: {
    floorHeightFt: number;
    labourIncluded: boolean;
    materialsIncluded: boolean;
  };
  finishLevels: { id: string; name: string; description: string }[];
  rateCatalogue: RateItem[];
  categories: { id: string; name: string }[];
  contingency: {
    percentage: number;
    verified: boolean;
    description: string;
  };
  exclusions: string[];
  disclaimer: string;
}

export interface EstimateLineItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  materialRate: number;
  labourRate: number;
  materialCost: number;
  labourCost: number;
  otherCost: number;
  totalCost: number;
  rateVerified: boolean;
  sourceType: string;
}

export interface EstimateCategory {
  id: string;
  name: string;
  totalCost: number;
  items: EstimateLineItem[];
}

export interface EstimateResult {
  location: string;
  currency: string;
  plotArea: number;
  areaPerFloor: number;
  floors: number;
  totalBuiltUpArea: number;
  finishLevel: FinishLevel;
  finishName: string;
  subtotal: number;
  contingencyPercentage: number;
  contingencyAmount: number;
  totalCost: number;
  materialCost: number;
  labourCost: number;
  categories: EstimateCategory[];
  exclusions: string[];
  assumptions: string[];
  isDevelopmentEstimate: boolean;
  allRatesVerified: boolean;
  disclaimer: string;
}

const rates = ratesData as unknown as RateCatalogue;

const roundMoney = (value: number) => Math.round(value);
const roundQuantity = (value: number) =>
  Math.round(value * 100) / 100;

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const { plotArea, areaPerFloor, floors, finishLevel } = input;

  if (!Number.isFinite(plotArea) || plotArea <= 0 || plotArea > 1_000_000) {
    throw new Error("Enter a valid plot area between 0 and 1,000,000 sq ft.");
  }

  if (
    !Number.isFinite(areaPerFloor) ||
    areaPerFloor <= 0 ||
    areaPerFloor > 100_000
  ) {
    throw new Error("Enter a valid building footprint between 0 and 100,000 sq ft.");
  }

  if (areaPerFloor > plotArea) {
    throw new Error("The building footprint cannot exceed the plot area.");
  }

  if (!Number.isInteger(floors) || floors < 1 || floors > 10) {
    throw new Error("The number of floors must be between 1 and 10.");
  }

  const selectedFinish = rates.finishLevels.find(
    (level) => level.id === finishLevel
  );

  if (!selectedFinish) {
    throw new Error("Select a valid finish level.");
  }

  const totalBuiltUpArea = areaPerFloor * floors;
  const floorHeight = rates.defaults.floorHeightFt;

  // Approximate a roughly square building footprint.
  // Wall area is an allowance, not a drawing-derived measurement.
  const estimatedPerimeter = 4 * Math.sqrt(areaPerFloor);
  const estimatedWallArea =
    estimatedPerimeter * floorHeight * floors * 1.8;

  const quantities: Record<string, number> = {
    plotArea,
    footprint: areaPerFloor,
    builtUp: totalBuiltUpArea,
    builtUpTimes0_35: totalBuiltUpArea * 0.35,
    builtUpTimes3_5: totalBuiltUpArea * 3.5,
    builtUpTimes1_5: totalBuiltUpArea * 1.5,
    footprintTimes0_8: areaPerFloor * 0.8,
    footprintTimes0_25: areaPerFloor * 0.25,
    wallArea: estimatedWallArea,
    wallAreaTimes2: estimatedWallArea * 2
  };

  const categories: EstimateCategory[] = rates.categories.map((category) => ({
    id: category.id,
    name: category.name,
    totalCost: 0,
    items: []
  }));

  for (const rate of rates.rateCatalogue) {
    const category = categories.find(
      (item) => item.id === rate.categoryId
    );

    if (!category) {
      throw new Error(`Unknown category "${rate.categoryId}" for item "${rate.id}".`);
    }

    const rawQuantity = quantities[rate.quantityFormula];

    if (rawQuantity === undefined || !Number.isFinite(rawQuantity)) {
      throw new Error(`Unknown quantity formula "${rate.quantityFormula}".`);
    }

    const quantity = roundQuantity(rawQuantity);
    const materialRate =
      rate.materialRates?.[finishLevel] ?? rate.materialRate ?? 0;
    const labourRate = rate.labourRate ?? 0;
    const fixedAllowanceRate = rate.fixedAllowanceRate ?? 0;

    const materialCost = roundMoney(quantity * materialRate);
    const labourCost = roundMoney(quantity * labourRate);
    const otherCost = roundMoney(quantity * fixedAllowanceRate);
    const totalCost = materialCost + labourCost + otherCost;

    category.items.push({
      id: rate.id,
      name: rate.name,
      unit: rate.unit,
      quantity,
      materialRate,
      labourRate,
      materialCost,
      labourCost,
      otherCost,
      totalCost,
      rateVerified: rate.verified,
      sourceType: rate.sourceType
    });

    category.totalCost += totalCost;
  }

  const subtotal = categories.reduce(
    (sum, category) => sum + category.totalCost,
    0
  );

  const contingencyAmount = roundMoney(
    (subtotal * rates.contingency.percentage) / 100
  );

  const materialCost = categories.reduce(
    (sum, category) =>
      sum + category.items.reduce((itemSum, item) => itemSum + item.materialCost, 0),
    0
  );

  const labourCost = categories.reduce(
    (sum, category) =>
      sum + category.items.reduce((itemSum, item) => itemSum + item.labourCost, 0),
    0
  );

  // Show contingency as its own category; never hide it in item rates.
  const contingencyCategory = categories.find(
    (category) => category.id === "contingency"
  );

  if (contingencyCategory) {
    contingencyCategory.totalCost = contingencyAmount;
  }

  return {
    location: rates.metadata.location,
    currency: rates.metadata.currency,
    plotArea,
    areaPerFloor,
    floors,
    totalBuiltUpArea,
    finishLevel,
    finishName: selectedFinish.name,
    subtotal,
    contingencyPercentage: rates.contingency.percentage,
    contingencyAmount,
    totalCost: subtotal + contingencyAmount,
    materialCost,
    labourCost,
    categories,
    exclusions: rates.exclusions,
    assumptions: [
      "Building footprint is treated as approximately rectangular and square-like for perimeter estimation.",
      "Wall quantities use a provisional allowance for internal partitions and external walls.",
      "Foundation, concrete, steel and formwork quantities are provisional factors, not quantities taken from structural drawings.",
      "External services are estimated using a basic plot-area allowance; boundary walls, retaining walls and difficult ground conditions are not fully measured.",
      "Material and labour rates are unverified development assumptions.",
      "Professional fees are represented by a provisional allowance."
    ],
    isDevelopmentEstimate: rates.metadata.status === "development_testing",
    allRatesVerified: rates.rateCatalogue.every((item) => item.verified),
    disclaimer: rates.disclaimer
  };
}
