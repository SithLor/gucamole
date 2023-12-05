function remove_duplicates_safe(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;

}
namespace slope_angle_error {
    export function slope_angle_arg(x1:number, y1:number, x2:number, y2:number) {
        if(arguments.length != 4) {return}
        let result = Math.atan2(y2 - y1, x2 - x1)
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_array(r:[number,number], r2:[number,number]) {
        if(arguments.length != 2) {return}
        let result = Math.atan2(r[1] - r[1], r2[0] - r[0])
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_object(r:{x1:number,y1:number,x2:number,y2:number}) {
        if(arguments.length != 2) {return}
        let result = Math.atan2(r.y2 - r.y1, r.x2 - r.x1)
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_object_2(r:{x:number,y:number}, r2:{x:number,y:number}) {
        if(arguments.length != 2) {return}
        let result = Math.atan2(r.y - r.y, r2.x - r.x)
        if(result < 0) {return 180-Math.abs(result)}
    }
}
namespace slope_angle {
    export function slope_angle_arg(x1:number, y1:number, x2:number, y2:number) {
        let result = Math.atan2(y2 - y1, x2 - x1)
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_array(r:[number,number], r2:[number,number]) {
        let result = Math.atan2(r[1] - r[1], r2[0] - r[0])
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_object(r:{x1:number,y1:number,x2:number,y2:number}) {
        let result = Math.atan2(r.y2 - r.y1, r.x2 - r.x1)
        if(result < 0) {return 180-Math.abs(result)}
    }
    export function slope_angle_object_2(r:{x:number,y:number}, r2:{x:number,y:number}) {
        let result = Math.atan2(r.y - r.y, r2.x - r.x)
        if(result < 0) {return 180-Math.abs(result)}
    }
}
function slope_angle_test_with_error_checking(){
    const data_arg = []
    const data_array = []
    const data_object = []
    const data_object_2 = []
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle_error.slope_angle_arg(9,8,1,1)
        const t1 = performance.now();
        data_arg.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle_error.slope_angle_array([9,8],[1,1])
        const t1 = performance.now();
        data_array.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle_error.slope_angle_array([9,8],[1,1])
        const t1 = performance.now();
        data_array.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle_error.slope_angle_object({x1:9,y1:8,x2:1,y2:1})
        const t1 = performance.now();
        data_object.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle_error.slope_angle_object_2({x:9,y:8},{x:1,y:1})
        const t1 = performance.now();
        data_object_2.push(t0-t1);
    }
    remove_duplicates_safe(data_arg)
    remove_duplicates_safe(data_array)
    remove_duplicates_safe(data_object)
    remove_duplicates_safe(data_object_2)
    data_arg.sort(function(a, b) {
        return a - b;
    })
    data_array.sort(function(a, b) {
        return a - b;
    })
    data_object.sort(function(a, b) {
        return a - b;
    })
    data_object_2.sort(function(a, b) {
        return a - b;
    })

    return({
        arg:data_arg,
        array:data_array,
        object:data_object,
        object_2:data_object_2
    })
}
function slope_angle_test_without_error_checking(){
    const data_arg = []
    const data_array = []
    const data_object = []
    const data_object_2 = []
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle.slope_angle_arg(9,8,1,1)
        const t1 = performance.now();
        data_arg.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle.slope_angle_array([9,8],[1,1])
        const t1 = performance.now();
        data_array.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle.slope_angle_array([9,8],[1,1])
        const t1 = performance.now();
        data_array.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle.slope_angle_object({x1:9,y1:8,x2:1,y2:1})
        const t1 = performance.now();
        data_object.push(t0-t1);
    }
    for (let i = 0;i<=10;i++){
        const t0 = performance.now();
        slope_angle.slope_angle_object_2({x:9,y:8},{x:1,y:1})
        const t1 = performance.now();
        data_object_2.push(t0-t1);
    }
    remove_duplicates_safe(data_arg)
    remove_duplicates_safe(data_array)
    remove_duplicates_safe(data_object)
    remove_duplicates_safe(data_object_2)
    data_arg.sort(function(a, b) {
        return a - b;
    })
    data_array.sort(function(a, b) {
        return a - b;
    })
    data_object.sort(function(a, b) {
        return a - b;
    })
    data_object_2.sort(function(a, b) {
        return a - b;
    })

    return({
        arg:data_arg,
        array:data_array,
        object:data_object,
        object_2:data_object_2
    })
}

const data = { 
    "intel(R) Celeron(R) N5100 @ 1.10GHz (4 threads, 2.80GHz)":{
        unsafe:slope_angle_test_with_error_checking(),
        safe:slope_angle_test_without_error_checking()
    },
}

console.log(JSON.stringify(data));
