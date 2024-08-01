document.addEventListener('DOMContentLoaded', () => {
    showPage(0);
    updateProgressBar(0);
});

const totalPages = 7; // Including result page

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === pageNumber) {
            page.classList.add('active');
        }
    });
    if (pageNumber > 0 && pageNumber <= totalPages - 1) {
        document.getElementById('progress-bar-container').classList.remove('hidden');
        updateProgressBar(pageNumber - 1);
    } else {
        document.getElementById('progress-bar-container').classList.add('hidden');
    }
}

function nextPage(pageNumber) {
    showPage(pageNumber);
}

function prevPage(pageNumber) {
    showPage(pageNumber);
}

function restartTest() {
    showPage(0);
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    updateProgressBar(0);
}

function shareResult() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('결과 페이지 URL이 클립보드에 복사되었습니다. 친구들과 공유해보세요!');
    });
}

function updateProgressBar(pageNumber) {
    const progress = (pageNumber / (totalPages - 2)) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function selectOption(questionNumber, value) {
    const options = document.querySelectorAll(`.page#page-${questionNumber} .option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    updateProgressBar(questionNumber);
    if (questionNumber < 6) {
        nextPage(questionNumber + 1);
    } else {
        showResult();
    }
}

function showResult() {
    const q1 = document.querySelector('.page#page-1 .selected').innerText;
    const q2 = document.querySelector('.page#page-2 .selected').innerText;
    const q3 = document.querySelector('.page#page-3 .selected').innerText;
    const q4 = document.querySelector('.page#page-4 .selected').innerText;
    const q5 = document.querySelector('.page#page-5 .selected').innerText;
    const q6 = document.querySelector('.page#page-6 .selected').innerText;

    let resultText = '';
    let imgSrc = '';
    let instrumentInfo = '';

    if (q1 === '외향적이고 활발하다.' && q3 === '강렬하고 힘찬 소리') {
        resultText = '당신은 에너지가 넘치고 강렬한 소리를 좋아하는 성격입니다. 타악기가 당신에게 딱 맞습니다!';
        imgSrc = 'percussion-thumbnail.png';
        instrumentInfo = '입문용 타악기 가격: 약 200,000원<br>추천 클래식 곡:<br><a href="https://www.youtube.com/watch?v=fOk8Tm815lE" target="_blank">베토벤 - 교향곡 5번</a>';
    } else if (q1 === '차분하고 내성적이다.' && q3 === '부드럽고 감미로운 소리') {
        resultText = '당신은 차분하고 부드러운 소리를 좋아하는 성격입니다. 플루트가 당신에게 잘 어울립니다!';
        imgSrc = 'flute-thumbnail.png';
        instrumentInfo = '입문용 플루트 가격: 약 300,000원<br>추천 클래식 곡:<br><a href="https://www.youtube.com/watch?v=e2u_zIhURmw" target="_blank">모차르트 - 플루트 협주곡 1번</a>';
    } else if (q1 === '외향적이고 활발하다.' && q3 === '경쾌하고 빠른 소리') {
        resultText = '당신은 활발하고 경쾌한 소리를 좋아하는 성격입니다. 바이올린이 당신에게 맞습니다!';
        imgSrc = 'violin-thumbnail.png';
        instrumentInfo = '입문용 바이올린 가격: 약 400,000원<br>추천 클래식 곡:<br><a href="https://www.youtube.com/watch?v=GRxofEmo3HA" target="_blank">비발디 - 사계</a>';
    } else if (q1 === '차분하고 내성적이다.' && q3 === '안정적이고 깊은 소리') {
        resultText = '당신은 차분하고 깊은 소리를 좋아하는 성격입니다. 첼로가 당신에게 적합합니다!';
        imgSrc = 'cello-thumbnail.png';
        instrumentInfo = '입문용 첼로 가격: 약 600,000원<br>추천 클래식 곡:<br><a href="https://www.youtube.com/watch?v=LU_QR_FTt3E" target="_blank">바흐 - 무반주 첼로 모음곡</a>';
    } else {
        resultText = '당신은 다양한 성향을 가진 사람입니다. 클라리넷이 당신에게 적합할 것입니다!';
        imgSrc = 'clarinet-thumbnail.png';
        instrumentInfo = '입문용 클라리넷 가격: 약 500,000원<br>추천 클래식 곡:<br><a href="https://www.youtube.com/watch?v=YT_63UntRJE" target="_blank">모차르트 - 클라리넷 협주곡</a>';
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result-img').src = imgSrc;
    document.getElementById('instrument-info').innerHTML = instrumentInfo;

    showPage(7);
}
