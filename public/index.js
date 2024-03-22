function update (originalName, name, number) {
    fetch('/update', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({OriginalName: originalName, Name: name, Number: number })
    })
    .then(raw => raw.text())
    .then(text => {
        window.location.assign(`/`);
    })
    .catch(err => {
        console.log(err);
    });
}

function _delete(name) {
    fetch('/delete', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name: name })
    })
    .then(raw => raw.text())
    .then(text => {
        window.location.assign(`/`);
    })
    .catch(err => {
        console.log(err);
    });
}

function pre_add() {
    window.location.assign(`/add`);
}

function add(name, number) {
    fetch('/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name: name, Number: number })
    })
    .then(raw => raw.text())
    .then(text => {
        window.location.assign(`/`);
    })
    .catch(err => {
        console.log(err);
    });
}

function back() {
    window.location.assign(`/`);
}