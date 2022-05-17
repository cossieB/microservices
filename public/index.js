const exForm = document.getElementById('exerciseForm')

exForm.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.getElementById('exId')
    exForm.action = `/api/exercisetracker/${input.value}/logs`
    exForm.submit()
})

const translateForm = document.getElementById('translateForm')

translateForm.addEventListener('submit', async e => {
    e.preventDefault()
    const text = document.getElementById('text').value
    const locale = document.getElementById('locale').value
    const res = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({text, locale}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if (data.translation) {
        const resultDiv = document.getElementById('translateResult')
        resultDiv.innerHTML = data.translation
    }
})
