export default function classNames(...values: any[]): string {
    const classes = [];

    for (let idx = 0; idx < values.length; idx += 1) {
        const arg = values[idx];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (Array.isArray(arg)) {
            if (arg.length) {
                const inner = classNames(...arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        }
        else if (argType === 'object') {
            if (arg.toString === Object.prototype.toString) {
                Object.keys(arg).forEach(key => {
                    if (arg[key]) classes.push(key);
                });
            }
        }
        else {
            classes.push(arg.toString());
        }
    }

    return classes.join(' ');
}