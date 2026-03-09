let currentIdx = 0;
const engine = {
    render() {
        const word = dailyWords[currentIdx];
        document.getElementById('word-card').className = `card-${word.type}`;
        document.getElementById('target-word').innerText = word.word;
        document.getElementById('phonetic').innerText = word.phonetic;
        const container = document.getElementById('meaning-container');
        container.innerHTML = word.meanings.map(m => `<div class="m-item">${m}</div>`).join('');
        this.runTimer(word.meanings.length);
    },
    runTimer(mCount) {
        let time = 0;
        const bar = document.getElementById('progress-fill');
        const items = document.querySelectorAll('.m-item');
        const interval = setInterval(() => {
            time += 100;
            bar.style.width = (time / 6000 * 100) + "%";
            const activeIdx = Math.floor(time / (6000 / mCount));
            items.forEach((item, i) => item.classList.toggle('active', i === activeIdx));
            if (time >= 6000) {
                clearInterval(interval);
                currentIdx++;
                if (currentIdx < dailyWords.length) setTimeout(() => this.render(), 500);
                else alert("오늘의 훈련 완료!");
            }
        }, 100);
    }
};
document.getElementById('start-btn').onclick = () => {
    document.getElementById('start-btn').style.display = 'none';
    engine.render();
};