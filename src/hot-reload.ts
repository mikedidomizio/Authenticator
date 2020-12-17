/* eslint-disable */

const filesInDirectory = (dir: DirectoryEntry): Promise<Entry[]> =>
  new Promise(resolve =>
    dir.createReader().readEntries((entries: Entry[]) =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== ".")
          .map(e =>
            e.isDirectory
              ? filesInDirectory(e as DirectoryEntry)
              : new Promise(resolve => (e as FileEntry).file(resolve))
          )
      )
        .then(files => [].concat(...files))
        .then(resolve)
    )
  );

const timestampForFilesInDirectory = (dir: DirectoryEntry) =>
  filesInDirectory(dir).then(files =>
    files
      .map(f => {
        console.log(">>>", f);
        return f.name + f.lastModifiedDate;
      })
      .join()
  );

const watchChanges = (dir: DirectoryEntry, lastTimestamp?: number) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      chrome.runtime.reload();
    }
  });
};

chrome.management.getSelf(self => {
  if (self.installType === "development") {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      // NB: see https://github.com/xpl/crx-hotreload/issues/5
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
});
