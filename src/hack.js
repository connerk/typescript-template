export async function main(ns) {
  const target = ns.args[0]
  const threads = ns.args[1]
  const delay = ns.args[2] || 0
  await ns.sleep(delay)
  await ns.hack(target, { threads, stock: true })
  ns.exit()
}