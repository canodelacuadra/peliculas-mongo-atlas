export function makeTableFetch(selector, url, captionTable) {
    const container = document.querySelector(selector);
    const urlFetch = url;

    fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const table = document.createElement('table');
            container.appendChild(table);

            const caption = document.createElement('caption');
            caption.innerText = captionTable;
            table.appendChild(caption);

            const tr = document.createElement('tr');
            for (const key in data[0]) {
                // if (key != "_id") {
                const th = document.createElement('th');
                th.innerText = key;
                tr.appendChild(th);
                //}
            }
            table.appendChild(tr)

            data.forEach(element => {
                const tr = document.createElement('tr');
                //li.textContent = element.titulo;

                for (const key in element) {
                    //if (key != "_id") {
                    const td = document.createElement('td');
                    td.innerText = element[key];
                    tr.appendChild(td);
                    //}

                }
                table.appendChild(tr);
            });

        })
        .catch(error => console(error));

}