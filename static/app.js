fetch('/questions.json')
  .then((r) => r.json())
  .then((data) => {
    const acc = data.questions.filter((q) => q.exam === 'ACC').length;
    const pcc = data.questions.filter((q) => q.exam === 'PCC_MCC').length;
    document.getElementById('acc').textContent = String(acc);
    document.getElementById('pcc').textContent = String(pcc);
    document.getElementById('disc').textContent = data.disclaimer;
  })
  .catch(() => {
    document.getElementById('disc').textContent = '問題データの読み込みに失敗しました。';
  });
