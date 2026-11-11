// Transparent character atlas derived from the teacher's three reference images.
const friends = [
  ['deer', 'Bạn nai nhỏ'], ['hedgehog', 'Bạn nhím đáng yêu'],
  ['squirrel', 'Bạn sóc tinh nghịch'], ['letter-a', 'Bạn chữ A']
];
export function decorateGarden() {
  for (const scene of document.querySelectorAll('.garden-frame, .treebox, .student-world')) {
    const layer = document.createElement('div');
    layer.className = 'garden-friends';
    layer.setAttribute('aria-hidden', 'true');
    for (const [kind, name] of friends) {
      const friend = document.createElement('span');
      friend.className = `garden-friend ${kind}`;
      friend.title = name;
      friend.innerHTML = '<span class="friend-sprite"></span><span class="friend-shadow"></span>';
      layer.appendChild(friend);
    }
    scene.appendChild(layer);
  }
}
