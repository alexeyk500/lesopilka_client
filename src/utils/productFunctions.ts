import { ProductType, SubCategoryType } from '../types/types';

export const splitProductsByManufacturer = (products: ProductType[]): ProductType[][] => {
  const separatedProducts: ProductType[][] = [];
  const manufacturerIds: number[] = [];
  products.forEach((product) => {
    if (product.manufacturer?.id) {
      if (!manufacturerIds.includes(product.manufacturer.id)) {
        manufacturerIds.push(product.manufacturer.id);
        separatedProducts.push([]);
      }
      const ind = manufacturerIds.findIndex((id) => id === product.manufacturer?.id);
      if (ind > -1) {
        separatedProducts[ind].push(product);
      }
    }
  });
  return separatedProducts;
};

export const splitBySubCategory = (products: ProductType[] | undefined, subCategories: SubCategoryType[]) => {
  if (products && products.length > 0) {
    const separatedProducts: ProductType[][] = [];
    subCategories.forEach((subCategory) => {
      const subCategoryProducts = products.filter((product) => product.subCategory?.id === subCategory.id);
      if (subCategoryProducts.length > 0) {
        separatedProducts.push(subCategoryProducts);
      }
    });
    const withoutSubCategoryProducts = products.filter((product) => product.subCategory === undefined);
    if (withoutSubCategoryProducts.length > 0) {
      separatedProducts.push(withoutSubCategoryProducts);
    }
    return separatedProducts;
  }
};
export const splitByIsDried = (productsGroup: ProductType[][] | undefined) => {
  if (productsGroup && productsGroup.length > 0) {
    const separatedProducts: ProductType[][] = [];
    productsGroup.forEach((productGroup) => {
      const isDriedProducts = productGroup.filter((product) => product.isDried === true);
      const notIsDriedProducts = productGroup.filter((product) => product.isDried === false);
      if (notIsDriedProducts.length > 0) {
        separatedProducts.push(notIsDriedProducts);
      }
      if (isDriedProducts.length > 0) {
        separatedProducts.push(isDriedProducts);
      }
    });
    return separatedProducts;
  }
};
export const splitByIsSeptic = (productsGroup: ProductType[][] | undefined) => {
  if (productsGroup && productsGroup.length > 0) {
    const separatedProducts: ProductType[][] = [];
    productsGroup.forEach((productGroup) => {
      const isSepticProducts = productGroup.filter((product) => product.isSeptic === true);
      const notIsSepticProducts = productGroup.filter((product) => product.isSeptic === false);
      if (notIsSepticProducts.length > 0) {
        separatedProducts.push(notIsSepticProducts);
      }
      if (isSepticProducts.length > 0) {
        separatedProducts.push(isSepticProducts);
      }
    });
    return separatedProducts;
  }
};
export const sortBySize = (productsGroup: ProductType[][] | undefined) => {
  if (productsGroup && productsGroup.length > 0) {
    const separatedProducts: ProductType[][] = [];
    productsGroup.forEach((productGroup) => {
      if (productGroup.length > 0) {
        const sortedByLength = productGroup.sort((a, b) => {
          return Number(a.length) - Number(b.length);
        });
        if (productGroup[0].caliber) {
          const sortedByCaliber = sortedByLength.sort((a, b) => {
            return Number(a.caliber) - Number(b.caliber);
          });
          separatedProducts.push(sortedByCaliber);
        } else {
          const sortedByWidth = sortedByLength.sort((a, b) => {
            return Number(a.width) - Number(b.width);
          });
          const sortedByHeight = sortedByWidth.sort((a, b) => {
            return Number(a.height) - Number(b.height);
          });
          separatedProducts.push(sortedByHeight);
        }
      }
    });
    return separatedProducts;
  }
};
export const sortBySortId = (productsGroup: ProductType[][] | undefined) => {
  if (productsGroup && productsGroup.length > 0) {
    const separatedProducts: ProductType[][] = [];
    productsGroup.forEach((productGroup) => {
      if (productGroup.length > 0) {
        const sortedBySortId = productGroup.sort((a, b) => {
          return Number(a.sort?.id) - Number(b.sort?.id);
        });
        separatedProducts.push(sortedBySortId);
      }
    });
    return separatedProducts;
  }
};
export const sortByMaterialId = (productsGroup: ProductType[][] | undefined) => {
  if (productsGroup && productsGroup.length > 0) {
    const separatedProducts: ProductType[][] = [];
    productsGroup.forEach((productGroup) => {
      if (productGroup.length > 0) {
        const sortedBySortId = productGroup.sort((a, b) => {
          return Number(a.material?.id) - Number(b.material?.id);
        });
        separatedProducts.push(sortedBySortId);
      }
    });
    return separatedProducts;
  }
};
