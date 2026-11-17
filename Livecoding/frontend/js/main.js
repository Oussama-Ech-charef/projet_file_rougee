document.addEventListener('DOMContentLoaded', () => {
    const table  = document.getElementById('table-category');
    const form  = document.getElementById('form_cat');
    const sectionform  = document.getElementById('sec_form');
    const nom  = document.getElementById('nom');
    const desc  = document.getElementById('desc');
    const btnsubmit  = document.getElementById('btn_submit');
    const spinner  = document.getElementById('spinner');
    const btntext  = document.getElementById('btn_text');
    
    const api  = document.getElementById('http://localhost:8000/backend/api/api.php');




    function afficherCategory() {
        fetch(api)
            .then(res => res.json())
            .then(category => {
                table.innerHTML = "";
                category.forEach(category => {
                    table.innerHTML += `
                        <tr>
                        <td class="p-4 text-sm font-semibold text-gray-500">${category.nom}</td>
                        <td class="p-4 text-sm font-semibold text-gray-500">${category.desc}</td>
                        </tr>
                    `;
                });
            })
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast_con');
        const toast = document.createElement("div");
        toast.className= "text-white px-4 py-2 rounded shadow-lg"

        if (type == "success") {
            toast.className += " bg-green-500"
        } else {
                        toast.className += " bg-red-500"

        }

        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }


    form.addEventListener("submit" , function (e) {
        let toastMesage ;
        let toasttype ;

        e.preventDefault();

        const data = {
            nom: nom.value,
            desc: desc.value
        }

        spinner.classList.remove('hidden')
        btntext.textContent = "enrgistrer..."
        btnsubmit.disabled = true;

        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        .then(res => {
            return res.json()
            .then(data => {
                if (!data.success) {
                    throw new Error(data.message);
                }else {
                    return data;
                }
            })
        })
        .then(() => {
            toastMesage = "category successefully";
            toasttype = "success";
            form.reset();
            afficherCategory();
        })

        .catch(error => {
            toastMesage = error.message;
            toasttype = "error";
        })

        .finally(() => {
            setTimeout(() => {
                showToast(toastMesage, toasttype);

                spinner.classList.add("hidden");
                btntext.textContent = "Enregistrer";
                btnsubmit.disabled = false;
                
            }, 1000);
        })

    })

    afficherCategory();

    
})