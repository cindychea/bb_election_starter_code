document.addEventListener("DOMContentLoaded", function() {

    axios.get('https://bb-election-api.herokuapp.com/')
        .then(response => {
            let data = response.data.candidates;
            const candidateList = document.getElementById('candidates');
            data.forEach(function(candidate) {
                let candidateInfo = document.createElement('li');
                candidateInfo.innerText = candidate.name + '\n' + 'Number of Votes: ' + candidate.votes
                candidateList.appendChild(candidateInfo)
            })
        });
        
});
