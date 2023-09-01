import famousNamesJson from '../data/famous-names.json' assert { type: 'json' };
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

class FamousNames {

    famousNames = [];

    constructor() {
        this.famousNames = famousNamesJson['famousNames'];
    }

    delete(btn) {
        const id = parseInt(btn.getAttribute('data-id'));
        this.famousNames.forEach((element, index) => {
            if (element.id === id) {
                this.famousNames.splice(index, 1);
            }
        });
        document.querySelector('.card[data-id="'+id+'"]').remove();
        btn.setAttribute('data-bs-dismiss', 'modal');
        btn.onreadystatechange = function () {
            btn.click();
        }
    }

    deleteModal(element) {
        const famousName = this.getFamousName(element);
        document.getElementById('nameToDelete').innerText = famousName.name;
        document.querySelector('.btn[action="delete"]').setAttribute('data-id', famousName.id);
    }

    edit(btn) {
        const id = parseInt(btn.getAttribute('data-id'));
        this.famousNames.forEach((element, index) => {
            if (element.id === id) {
                this.famousNames[index] = {
                    id: id,
                    name: document.getElementById('nameToEdit').value,
                    location: { 
                        lat: document.getElementById('latToEdit').value,
                        lng: document.getElementById('lngToEdit').value
                    }
                }
                document.querySelector('.card[data-id="'+id+'"] h5').innerText = this.famousNames[index].name;
                document.querySelector('.card[data-id="'+id+'"]').setAttribute('data-name', this.famousNames[index].name);
                document.querySelector('.card[data-id="'+id+'"]').setAttribute('data-lat', this.famousNames[index].location.lat);
                document.querySelector('.card[data-id="'+id+'"]').setAttribute('data-lng', this.famousNames[index].location.lng);
            }
        });
        btn.setAttribute('data-bs-dismiss', 'modal');
        btn.onreadystatechange = function () {
            btn.click();
        }
    }

    editModal(element) {
        const famousName = this.getFamousName(element);
        document.getElementById('nameToEdit').value = famousName.name;
        document.getElementById('latToEdit').value = famousName.lat;
        document.getElementById('lngToEdit').value = famousName.lng;
        document.querySelector('.btn[action="edit"]').setAttribute('data-id', famousName.id);
    }

    viewModal(element) {
        const famousName = this.getFamousName(element);
        document.getElementById('GoogleMapLabel').innerText = famousName.name;
        const coords = {
            lat: parseFloat(famousName.lat),
            lng: parseFloat(famousName.lng)
        };
        const map = new google.maps.Map(document.getElementById("gmap"), {
            zoom: 8,
            center: coords,
            fullscreenControl: false,
            zoomControl: true,
            streetViewControl: false
        });
        const marker = new google.maps.Marker({
            position: coords,
            map,
            title: famousName.name
        });
        const infowindow = new google.maps.InfoWindow({
            content: '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">'+famousName.name+'</h1>' +
            '<div id="bodyContent">' +
            '<p>Latitude: ' + famousName.lat + '</p>' +
            '<p>Longitude: ' + famousName.lng + '</p>' +
            '</div>'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }

    getFamousName(element) {
        let parent = element.closest('.card');
        return {
            id: parent.getAttribute('data-id'),
            name: parent.getAttribute('data-name'),
            lat: parent.getAttribute('data-lat'),
            lng: parent.getAttribute('data-lng')
        };
    }
}

const famousNames = new FamousNames();
let btnViewModal = document.getElementsByClassName('btn-view');
let btnEditModal = document.getElementsByClassName('btn-edit');
let btnDeleteModal = document.getElementsByClassName('btn-delete');
let GoogleMapModal = document.getElementById('GoogleMapModal');
const btnEdit = document.querySelector('.btn[action="edit"]');
const btnDelete = document.querySelector('.btn[action="delete"]');

// ADD EVENTS
for (let i=0; i<btnViewModal.length; i++) {
    btnViewModal[i].addEventListener('click', () => famousNames.viewModal(btnViewModal[i]));
    btnEditModal[i].addEventListener('click', () => famousNames.editModal(btnEditModal[i]));
    btnDeleteModal[i].addEventListener('click', () => famousNames.deleteModal(btnDeleteModal[i]));
}

btnDelete.addEventListener('click', () => famousNames.delete(btnDelete));
btnEdit.addEventListener('click', () => famousNames.edit(btnEdit));