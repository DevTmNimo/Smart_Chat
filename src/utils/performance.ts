

const start = performance.now()


function loop():void {

    for(let i = 0; i <=10000; i++) {

        console.log(i);
    }

}

const finish = performance.now()


function testPerformace(){

    console.log(start);

    loop();

    console.log(finish);
}

testPerformace();