<script>
    let startCommit = "";
    let endCommit = "";
    const getCommits = (project) => {
        console.log(project);
        fetch(`/commits?project=${project}`)
            .then((response) => {
                // When the page is loaded convert it to text
                return response.text();
            })
            .then((data) => {
                console.log(data);

                var iframe = document.getElementById("plot");
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(data);
                iframe.contentWindow.document.close();
                plotName = project;
            })
            .catch((error) => {
                console.error("Failed to fetch page: ", error);
            });
    };
</script>

<input type="date" bind:value={startCommit} />
<input type="date" bind:value={endCommit} />
