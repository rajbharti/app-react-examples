import type { Tag, Comp, Category, CompCategoryAndTags } from "./types";
import { mapTagToComps } from "./App";

export function* getCompTags(
  Comp: Comp,
  activeTag: Tag
): Iterable<CompCategoryAndTags> {
  for (const category in mapTagToComps) {
    const tags = mapTagToComps[category];

    for (const tag in tags) {
      if (tags[tag].find((c: Comp) => c === Comp)) {
        // insert all other tags except activeTag
        console.log(`[${category.toUpperCase()}: ${tag}]`);
        if (tag !== activeTag) {
          yield { category, tag };
        }
      }
    }
  }
}

export function getActiveTagCompsCount(category: Category, tag: Tag) {
  return mapTagToComps[category][tag]?.length || 0;
}

export function squareCal(value: number) {
  console.log("squareCal is invoked");

  return value ** 2;
}

export function getSumOfSquareAndCube(square: number, cube: number) {
  console.log("getSumOfSquareAndCube is invoked");

  return square + cube;
}

export function* getEvenNumbers(): Iterable<number> {
  console.log("getEvenNumbers is invoked");

  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      yield i;
    }
  }
}

export function getPrimeNums() {
  console.log("getPrimeNums is invoked");

  const result = [];

  for (let n = 2; n <= 10; n++) {
    let flag = 0;

    for (let j = 2; j <= n / 2; j++) {
      if (n % j === 0) {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      result.push(n);
    }
  }

  return result;
}

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 1000)
  );
}

export function getTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
