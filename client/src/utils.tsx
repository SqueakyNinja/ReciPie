export function combineClasses(...classes: unknown[]) {
  return classes
    .filter((currentClass) => typeof currentClass === "string")
    .join(" ");
}
