export async function main(ns) {
 Number.prototype.toExponential = function () { return null; };
 window.performance.now = function() {return 0;};
 ns.exploit();
}