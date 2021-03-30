export function combineClasses(...classes: unknown[]) {
  return classes
    .filter((currentClass) => typeof currentClass === 'string')
    .join(' ');
}

export const textEllipsis = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};
