const defaultOption = {
    attributes: true,
    childList: true,
    subtree: true
};

export default function(fn: MutationCallback) {
    const observer = new MutationObserver(fn);
    observer.observe(document.body, defaultOption);
    return observer;
}
