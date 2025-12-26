
function mapToNames(){
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [john, pete, mary];

let names = users.map(user => user.name);
  /* ... your code */

  console.log(`names:${names}`); // John, Pete, Mary
}

function mapToObjects(){
    let john = { name: "John", surname: "Smith", id: 1 };
    let pete = { name: "Pete", surname: "Hunt", id: 2 };
    let mary = { name: "Mary", surname: "Key", id: 3 };

    let users = [ john, pete, mary ];

    let usersMapped = users.map(users=>({fullName:`${users.name} ${users.surname}`,id:users.id
    }));/* ... your code ... */

    /*
    usersMapped = [
    { fullName: "John Smith", id: 1 },
    { fullName: "Pete Hunt", id: 2 },
    { fullName: "Mary Key", id: 3 }
    ]
    */

    console.log( usersMapped[0].id ) // 1
    console.log( usersMapped[0].fullName ) // John Smith
}
function sortByAge(){
    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };
    
    let users = [john, pete, mary];
    
    users.sort((a,b)=>a.age-b.age);
    
    console.log(`sorted users:${users.map(user=>user.name)}`);
}

function shuffleArray(){
    let arr = [1,2,3];
    function shuffle(arr){
        for(let i=arr.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [arr[i],arr[j]]=[arr[j],arr[i]];
        }
    }
for(let i=0;i<arr.length;i++){
    shuffle(arr);
    console.log(arr);
}
}
function AverageAge(){
    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 29 };

    let arr = [john, pete, mary];

    console.log(getAverageAge(arr));
    function getAverageAge(users){
        let sum = users.reduce((acc,user)=>acc+user.age,0);
        return sum/users.length;
    }
}
function byId(){
    let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    let usersById = groupById(users);
    console.log(usersById);
    function groupById(users){
        return users.reduce((acc,user)=>{
            acc[user.id]=user;
            return acc;
        },{});
    }
}
mapToNames();
mapToObjects();
sortByAge();
shuffleArray();
AverageAge();
byId();