import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({basename: '/'});

let pastLocations = [];

function updatePastLocations(location, action) {
    console.group();
    console.log('initial', {location, action, pastLocations});
    if (['/', '/signin', '/logout'].includes(location.pathname)) {
        pastLocations = [];
        console.log('update', {location, action, pastLocations});
        console.groupEnd();
        return;
    }

    switch (action) {
        case 'PUSH':
            pastLocations.push(location);
            break;
        case 'REPLACE':
            pastLocations[pastLocations.length - 1] = location;
            break;
        case 'POP': {
            pastLocations.pop();
            const appLocation = pastLocations[pastLocations.length - 1];
            if (!(appLocation && appLocation.key === location.key)) {
                pastLocations = [location];
            }
            break;
        }
        default:
    }
    console.log('update', {location, action, pastLocations});
    console.groupEnd();
}

history.listen(updatePastLocations);

function isPreviousLocationWithinApp() {
    return pastLocations.length > 1;
}

export function getPrevLocationOrReplace(location) {
    console.group();
    console.log({pastLocations});
    if (isPreviousLocationWithinApp()) {
        console.log(pastLocations[pastLocations.length - 2]);
        console.groupEnd();
        return pastLocations[pastLocations.length - 2];
    } else {
        console.log(location);
        console.groupEnd();
        return location;
    }
}

export function goBackOrReplace(location, state) {
    if (isPreviousLocationWithinApp()) {
        history.goBack();
    } else {
        history.replace(location, state);
    }
}
