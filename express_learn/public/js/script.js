const images = []
const length = 12;
// 循环生成 length 张图片的名称
for (let i = 1; i <= length; i++) {
    // 这里的 `${i}.jpg` 是一个模板字符串，用来拼接图片的名称
    images.push(`img/${i}.jpg`);
}

console.log(images);

const imageContainer = document.getElementById('imageGrid');

//forEach 方法来遍历存储在 images 数组中的图片路径，并对每个图片执行特定的操作
images.forEach(image => {
    const imageItem = document.createElement('div');
    // 向 imageItem 元素添加 class 属性
    imageItem.classList.add('image-item');
    const img = document.createElement('img');
    // 设置 img 元素的 src 和 alt 属性
    img.src = image;
    img.alt = 'billie eilish';
    // 向 imageItem 元素添加 img 元素
    imageItem.appendChild(img);
    // 向 imageContainer 元素添加 imageItem 元素
    imageContainer.appendChild(imageItem);
});
