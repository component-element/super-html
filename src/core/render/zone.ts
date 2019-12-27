export const zones = new WeakMap();
const globalZoneKey = 'Zone';

export function makeZone() {
    let afterTask = function noop() {};
    const zone = window[globalZoneKey].current.fork({
        afterTask(args) {
            afterTask.apply(null, args);
        },
        onHasTask(delegate, currentZone, targetZone, hasTaskState) {
            console.log('onHasTask', delegate, currentZone, targetZone, hasTaskState);
            this.afterTask();
            // if (!hasTaskState.microTask && !hasTaskState.eventTask && !hasTaskState.macroTask) {

            // }
        },
        onSheduleTask() {
            this.afterTask();
        },
        onIntercept() {
            this.afterTask();
        },
        onInvokeTask() {
            this.afterTask();
        }
    });
    const run = zone.run;
    zone.run = function(...args) {
        const result = run.apply(zone, args);
        zone._zoneDelegate._hasTaskZS.afterTask();
        return result;
    };
    zone.setAfterTask = (fn) => {
        afterTask = fn;
    };
    return zone;
}
