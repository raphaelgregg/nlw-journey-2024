// libs terceiros
const formatter = (date) => {
    return {
        day: {
            numeric: dayjs(date).format('DD'),
            week: {
                small: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd'),
            }
        },
        month: dayjs(date).format('MMMM'),
        time: dayjs(date).format('HH:mm')
    }
}

formatter(new Date('2024-07-13'))

// object
const activity = {
    name: 'Jantar',
    date: new Date("2024-07-13 19:00"),
    finish: false
}

let activities = [
    activity,
    {
        name: 'Almoço',
        date: new Date("2024-08-11 08:00"),
        finish: false
    }
]

// activities = [];

//functions
const createActivityItem = (item) => {
    let input = `
        <input 
            onchange="finishActivity(event)"
            value="${item.date}"
            type="checkbox"
    `;

    if(item.finish) input += "checked"

    input += '>';

    const formated = formatter(item.date);

    return `
            <div class="card-bg">
                ${input}

                <div>
                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                <span>${item.name}</span>
                </div>

                <time class="short">
                    ${formated.day.week.small}.
                    ${formated.day.numeric} <br>
                    ${formated.time}
                </time>

                <time class="full">
                    ${formated.day.week.long}, 
                    dia ${formated.day.numeric}
                    de ${formated.month}
                    às ${formated.time}h
                </time>
            </div>
    `
}

const updateActivityList = () => {
    const section = document.querySelector('section');
    // apaga section 
    section.innerHTML = '';

    // Verificar se lista esta vazia
    if(activities.length == 0) {
        section.innerHTML = 'Nem uma atividade cadastrada...'
        return
    }    
    
    for(let item of activities) {
        section.innerHTML += createActivityItem(item)
    }
}

updateActivityList()

const handleSaveActivity = (event) => {
    event.preventDefault();
    const dataFromForm = new FormData(event.target)

    const name = dataFromForm.get('activity');
    const day = dataFromForm.get('day');
    const hour = dataFromForm.get('hour');
    const date = `${day} ${hour}`;

    const newActivity = {
        name: name,
        date: date,
        finish: false
    }

    const activityExists = activities.find((activity) => {
        return activity.date == newActivity.date
    })

    if(activityExists) return alert('Dia/Hora não disponível')

    activities = [newActivity, ...activities]
    updateActivityList();
}

const createDaysSelect = () => {
   const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
   ]

   let daysSelected = '';

   for(let day of days) {
    const formated = formatter(day);
    const dayFormated = `${formated.day.numeric} de ${formated.month}`

    daysSelected += `
        <option value="${day}"> ${dayFormated}</option>
    `
   }

   document.querySelector('select[name="day"]').innerHTML = daysSelected;
}

createDaysSelect();

const createHoursSelect = () => {
    let hoursAvailable = '';

    for(let i = 6; i < 23; i++) {
        const hour = String(i).padStart(2, '0')
        hoursAvailable += `<option value="${hour}:00">${hour}:00</option>`
        hoursAvailable += `<option value="${hour}:30">${hour}:30</option>`
    }

    document.querySelector('select[name="hour"]').innerHTML = hoursAvailable;
}

createHoursSelect();

const finishActivity = (event) => {
    const input = event.target
    const dateOfInput = input.value
    
    const activity = activities.find((activity) => {
        return activity.date == dateOfInput
    })
    
    // se atividade não existir retornar
    if(!activity) {
        return
    }
    
    // atividade recebe o inverso de seu valor
    activity.finish = !activity.finish
}