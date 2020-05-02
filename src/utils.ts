
export function cleanTag(tag: string): string {
  if(tag.startsWith("#")) tag = tag.slice(0);
  return tag.replace(/O/g, "0");
}
