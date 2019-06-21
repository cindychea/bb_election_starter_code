document.addEventListener("DOMContentLoaded", function() {

    axios.get('https://bb-election-api.herokuapp.com/')
        .then(response => {
            let data = response.data.candidates;
            const candidateList = document.getElementById('candidates');
            data.forEach(function(candidate) {
                let candidateInfo = document.createElement('li');
                let infoHolder = document.createElement('span');
                candidateInfo.appendChild(infoHolder);
                infoHolder.id = candidate.name
                infoHolder.className = 'name-votes'
                infoHolder.innerText = candidate.name + '\n' + 'Number of Votes: ' + candidate.votes;
                
                candidateList.appendChild(candidateInfo);
                
                let candidateForm = document.createElement('form');
                let submitVote = document.createElement('button');
                submitVote.type = 'submit';
                submitVote.name = 'vote';
                submitVote.className = 'submit-vote'
                submitVote.innerText = 'Vote';
                candidateForm.appendChild(submitVote);
                let voteInfo = document.createElement('input');
                voteInfo.type = 'hidden';
                voteInfo.name = 'name';
                voteInfo.value = candidate.name;
                candidateForm.appendChild(voteInfo);
                candidateForm.className = "vote-forms"
                candidateForm.method = "POST";
                candidateForm.action = "https://bb-election-api.herokuapp.com/vote";
                candidateInfo.appendChild(candidateForm);
            });

            let userVotes = document.querySelectorAll('.vote-forms');
            
            userVotes.forEach(function(vote) {
                vote.addEventListener('click', e => {
                    e.preventDefault();
                    vote.querySelector('.submit-vote').disabled = true;

                    if (vote.querySelector('.submit-vote').disabled != true) {
                        return;
                    } else {
                        let actionUrl = vote.action
                        axios({
                            method: 'POST',
                            url: actionUrl,
                            data: {
                                name: vote.querySelector('input[type=hidden]').value
                            }
                        })
                        .then(response => {
                            let message  = document.createElement('p');
                            message.innerText = 'Vote submitted!';
                            message.style.color = 'green';
                            vote.appendChild(message);

                            axios.get('https://bb-election-api.herokuapp.com/')
                            .then(response => {
                                let data = response.data.candidates
                                let nameVoteInfo = document.querySelectorAll('.name-votes')
                                nameVoteInfo.forEach(item => {
                                    item.innerText = '';
                                    data.forEach(candidate => {
                                        if (item.id === candidate.name) {
                                            item.innerText = candidate.name + '\n' + 'Number of Votes: ' + candidate.votes;
                                        }
                                    })
                                })
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            let message  = document.createElement('p');
                            message.innerText = 'Error: Vote not submitted!';
                            message.style.color = 'red';
                            vote.appendChild(message);
                        })
                    }
                })
            });
        });
    });
    
    