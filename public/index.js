const form = document.getElementById('exerciseForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.getElementById('exId')
    form.action = `/api/exercisetracker/${input.value}/logs`
    form.submit()
})