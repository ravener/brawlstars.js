
export function cleanTag(tag: string): string {
  if(tag.startsWith("#")) tag = tag.slice(1);
  return tag.replace(/O/g, "0");
}
