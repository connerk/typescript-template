function getDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject("Indexed DB does not exists");
    }
    const indexedDbRequest = window.indexedDB.open("bitburnerSave", 1);

    indexedDbRequest.onupgradeneeded = function () {
      const db = indexedDbRequest.result;
      db.createObjectStore("savestring");
    };

    indexedDbRequest.onerror = function (ev) {
      reject(`Failed to get IDB ${ev}`);
    };

    indexedDbRequest.onsuccess = function () {
      const db = indexedDbRequest.result;
      if (!db) {
        reject("database loadign result was undefined");
        return;
      }
      resolve(db.transaction(["savestring"], "readwrite").objectStore("savestring"));
    };
  });
}

function load() {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        return new Promise((resolve, reject) => {
          const request = db.get("save");
          request.onerror = function (ev) {
            reject("Error in Database request to get savestring: " + ev);
          };

          request.onsuccess = function () {
            resolve(request.result);
          };
        }).then((saveString) => resolve(saveString));
      })
      .catch((r) => reject(r));
  });
}

/** @param {NS} ns **/
export async function main(ns) {
    let saveStr = decodeURIComponent(escape(atob(await load())));
    // saveStr = saveStr.replace(/\\"/g,'"');
    const json = JSON.parse(saveStr)
    const playerSave = JSON.parse(json.data.PlayerSave)
    ns.tprint(JSON.stringify(playerSave,null,4));

}