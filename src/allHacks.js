export function allHacks(ns) {
  const host = ns.args[0]
  if (!host) return
  ns.brutessh(host)
  ns.ftpcrack(host)
  ns.relaysmtp(host)
  ns.httpworm(host)
  ns.sqlinject(host)
}