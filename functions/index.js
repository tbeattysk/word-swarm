var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.updateWord = functions.database
.ref('/swarms/{swarmid}/users/{uid}/wordsAdded/{wordid}')
.onWrite(event =>{
    const swarmid = event.params.swarmid
    const userWordId = event.params.wordid
    const root = event.data.adminRef.root
    const userWord = event.data.val()
    console.log(userWord);
    if(!userWord.update) return
    if(!userWord.wordId){
        //TO DO: confirm unique word (avoid malicious word adding)
        return root.child(`/swarms/${swarmid}/words`).push({
            name: userWord.name,
            userWordId: userWordId
        }).then(word =>{
            userWord.update = false
            userWord.wordId = word.key
            return event.data.ref.set(userWord)
        }).catch(reason =>{
            console.log(reason)
        })
    }else{
        uswerWord.update = false
        return event.data.ref.set(userWord)
        .then(snap =>{
            root.child(`/swarms/${swarmid}/words/${userWord.wordId}`).once('value')
        }).then(wordSnap => {
            const word = wordSnap.val()
            word.name = userWord.name
            return swarmSnap.set(swarm)
        }).catch(reason =>{
            console.log(reason)
        })
    }
})

 exports.updateSwarm = functions.database
 .ref('/users/{uid}/swarms/{swarm}')
 .onWrite(event=>{
    const userswarmid = event.params.swarm
    const uid = event.params.uid
    const root = event.data.adminRef.root
    const userSwarm = event.data.val()
    if(!userSwarm.update) return
    if(!userSwarm.swarmId){
        return root.child('swarms').push(newSwarm(uid,userSwarm.title,userswarmid,userSwarm.ownerName))
        .then(swarm =>{
            userSwarm.swarmId = swarm.key
            userSwarm.update = false
            return event.data.adminRef.set(userSwarm)
        }).catch(reason =>{
            console.log(reason)
        })   
    }else{
        userSwarm.update = false
        return event.data.adminRef.set(userSwarm)
        .then(snap =>{
            root.child(`/swarms/${userSwarm.swarmId}`).once('value')
        })
        .then(swarmSnap => {
            if(swarmSnap.child('/permissions/admin').haschild(uid)){
                const swarm = swarmSnap.val()
                swarm.title = userSwarm.title
                return swarmSnap.set(swarm)
            }else return
        }).catch(reason =>{
            console.log(reason)
        })
    }
});

function newSwarm(uid,title,userSwarmId, swarmOwner){
    var template={
        title:title,
        owner:swarmOwner,
        users:{},
        permissions:{
            admin:{},
            members:{},
            readOnly:{}
        },
        words:{},
        descriptions:{
            one:{
                1:{
                    desc:" One is the first number.",
                    time: Date.now()
                }
            },
            two:{
                1:{
                    desc:" Two is the second number.",
                    time: Date.now()
                }
            }
        },
        comparisons:{
            one_two:{
                desc:"one comes before two"
            },
            three_two:{
                desc:"two comes before three"
            }
        },
    }
    template.users[uid]={
        user:swarmOwner,
        userSwarmId:userSwarmId,
        wordsAdded:["one","two","three"],
        descAdded:["one1","two1","three1"],
        compAdded:["one_two1","three_two1"]
    }
    template.permissions.admin[uid]={
        owner: true,
    }
    return template
}
