const data=[
    {
        type:'image',
        src:'https://img.zcool.cn/community/01b1d5563eca0a32f87512f61f3d69.jpg@3000w_1l_0o_100sh.jpg'
    },
    {
        type:'js',
        src:'http://localhost:7100/static/js/bundle.js'
    }
]

const prefetch=({type,src})=>{
    if(type==='image'){
        const image=new Image();
        image.crossOrigin='include';
        image.src=src;

    }else if(type==='js'){
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    }
}

const prefetchAll=(arr=[])=>{
    arr.map((v)=>{
        prefetch(v)
    })
}

prefetchAll(data);