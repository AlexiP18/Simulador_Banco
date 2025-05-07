import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreditosService } from '../../services/creditos.service';

declare var google: any;

@Component({
  selector: 'app-info-institucional',
  templateUrl: './info-institucional.component.html',
  styleUrls: ['./info-institucional.component.scss']
})
export class InfoInstitucionalComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | undefined;

  charCount: number = 0;
  logoSrc: string | null = null;
  phoneNumber: string = '';
  phoneError: string | null = null;
  isModalOpen: boolean = false;
  selectedSocial: string = '';
  socialLink: string = '';

  customChips: { name: string; icon: string; link: string }[] = [];
  isAddChipModalOpen: boolean = false;

  locationAddress: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  mapLoaded: boolean = false;
  map: any;
  marker: any;

  informacionInstitucional: any = {}; // Objeto para almacenar la información institucional

  availableIcons = [
    { name: 'Facebook', class: 'fab fa-facebook-f' },
    { name: 'Instagram', class: 'fab fa-instagram' },
    { name: 'Twitter', class: 'fab fa-twitter' },
    { name: 'Youtube', class: 'fab fa-youtube' },
    { name: 'LinkedIn', class: 'fab fa-linkedin-in' },
    { name: 'Whatsapp', class: 'fab fa-whatsapp' },
    { name: 'TikTok', class: 'fab fa-tiktok' },
    { name: 'Pinterest', class: 'fab fa-pinterest' },
    { name: 'Telegram', class: 'fab fa-telegram' },
  ];

  filteredIcons = [...this.availableIcons]; // Inicializar con todos los íconos disponibles
  searchQuery: string = ''; // Inicializar como cadena vacía
  selectedIconClass: string = ''; // Para almacenar la clase del ícono seleccionado

  constructor(private creditosService: CreditosService) {}

  ngOnInit(): void {
    this.loadInformacionInstitucional();
  }

  ngAfterViewInit(): void {
    this.loadGoogleMapsScript();
  }

  loadInformacionInstitucional(): void {
    this.creditosService.getInformacionInstitucional().subscribe(
      (response) => {
        if (response && response.data) { // Acceder directamente a response.data
          this.informacionInstitucional = response.data[0]; // Asumimos que es un array y tomamos el primer elemento
          this.populateFormFields();
        } else {
          console.error('Error en la respuesta del servidor:', response);
          alert('No se pudo cargar la información institucional.');
        }
      },
      (error) => {
        console.error('Error al cargar la información institucional:', error);
        alert('Ocurrió un error al intentar cargar la información institucional.');
      }
    );
  }

  populateFormFields(): void {
    this.logoSrc = this.informacionInstitucional.logo || null;
    this.phoneNumber = this.informacionInstitucional.contacto_telefonico || '';
    this.locationAddress = this.informacionInstitucional.direccion || '';
    this.latitude = this.informacionInstitucional.latitud || null;
    this.longitude = this.informacionInstitucional.longitud || null;
    // Asignar otros campos del formulario
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const descripcionTextarea = document.getElementById('descripcion') as HTMLTextAreaElement;
    if (nombreInput) nombreInput.value = this.informacionInstitucional.nombre || '';
    if (descripcionTextarea) descripcionTextarea.value = this.informacionInstitucional.descripcion || '';
  }

  saveInformacionInstitucional(): void {
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const descripcionTextarea = document.getElementById('descripcion') as HTMLTextAreaElement;

    const data = {
      nombre: nombreInput?.value || '',
      descripcion: descripcionTextarea?.value || '',
      logo: this.logoSrc,
      contacto_telefonico: this.phoneNumber,
      direccion: this.locationAddress,
      latitud: this.latitude,
      longitud: this.longitude,
      // Agregar otros campos según sea necesario
    };

    this.creditosService.updateInformacionInstitucional(data).subscribe(
      (response) => {
        if (response.status === 'success') {
          alert('Información institucional actualizada correctamente.');
        } else {
          console.error('Error en la respuesta del servidor:', response);
          alert('No se pudo actualizar la información institucional.');
        }
      },
      (error) => {
        console.error('Error al actualizar la información institucional:', error);
        alert('Ocurrió un error al intentar actualizar la información institucional.');
      }
    );
  }

  loadGoogleMapsScript(): void {
    // Cargar Google Maps dinámicamente
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Definir la función de callback global
      (window as any)['initMap'] = () => {
        this.initMap();
      };

      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap(): void {
    // Esta función se encargará de inicializar el mapa de Google
    // Normalmente, aquí se requeriría una API key de Google Maps

    // Simular carga del mapa (en una implementación real, esto sería el callback de Google Maps API)
    setTimeout(() => {
      this.mapLoaded = true;

      // Ubicación por defecto (Ecuador)
      this.latitude = -0.1807;
      this.longitude = -78.4678;

      // Aquí iría la inicialización real del mapa con Google Maps API
      // Por ejemplo:

      if (this.mapContainer?.nativeElement) {
        this.map = new google.maps.Map(this.mapContainer.nativeElement, {
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 15
        });
      }

      this.marker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
        draggable: true
      });

      // Actualizar lat/lng cuando se mueve el marcador
      google.maps.event.addListener(this.marker, 'dragend', () => {
        const position = this.marker.getPosition();
        this.latitude = position.lat();
        this.longitude = position.lng();
        if (this.latitude !== null && this.longitude !== null) {
          this.getAddressFromCoordinates(this.latitude, this.longitude);
        }
      });

    }, 1000);
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          // Actualizar el mapa con las nuevas coordenadas
          this.updateMapLocation();

          // Obtener dirección a partir de coordenadas (geocodificación inversa)
          this.getAddressFromCoordinates(this.latitude, this.longitude);
        },
        (error) => {
          let message = 'Error al obtener la ubicación: ';

          switch(error.code) {
            case error.PERMISSION_DENIED:
              message += 'El usuario denegó la solicitud de geolocalización.';
              break;
            case error.POSITION_UNAVAILABLE:
              message += 'La información de ubicación no está disponible.';
              break;
            case error.TIMEOUT:
              message += 'Se agotó el tiempo de espera para obtener la ubicación.';
              break;
            default:
              message += 'Error desconocido.';
          }

          alert(message);
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
    }
  }

  updateMapLocation(): void {
    // Aquí iría el código para actualizar el mapa con las nuevas coordenadas
    // Por ejemplo:

    if (this.map && this.marker) {
      const newPosition = { lat: this.latitude, lng: this.longitude };
      this.map.setCenter(newPosition);
      this.marker.setPosition(newPosition);
    }

    console.log(`Mapa actualizado a lat: ${this.latitude}, lng: ${this.longitude}`);
  }

  getAddressFromCoordinates(lat: number, lng: number): void {
    // Aquí iría el código para obtener la dirección a partir de las coordenadas (geocodificación inversa)
    // Por ejemplo:

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': { lat, lng } }, (results: { formatted_address: string; }[], status: string) => {
      if (status === 'OK' && results[0]) {
        this.locationAddress = results[0].formatted_address;
      } else {
        this.locationAddress = `${lat}, ${lng}`;
      }
    });


    // Simulación:
    this.locationAddress = `Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  onDescriptionInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.charCount = textarea.value.length;
  }

  onLogoClick(): void {
    const fileInput = document.getElementById('logo-input') as HTMLInputElement;
    fileInput.click();
  }

  onLogoChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Permitir solo números y el guion
    input.value = input.value.replace(/[^0-9-]/g, '');
    // Aplicar formato ##-#######
    if (input.value.length > 2 && !input.value.includes('-')) {
      input.value = input.value.slice(0, 2) + '-' + input.value.slice(2);
    }
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Limitar a 10 caracteres (##-#######)
    }
    this.phoneNumber = input.value;
    this.phoneError = null; // Limpiar el error mientras escribe
  }

  validatePhoneNumber(): void {
    const phoneRegex = /^0[2-7]-\d{7}$/; // Formato para teléfonos convencionales de Ecuador
    if (!phoneRegex.test(this.phoneNumber)) {
      this.phoneError = 'Por favor, ingrese un número de teléfono válido de Ecuador en el formato ##-########.';
    } else {
      this.phoneError = null; // Número válido
    }
  }

  openSocialModal(social: string): void {
    this.selectedSocial = social;
    this.isModalOpen = true;
  }

  closeSocialModal(): void {
    this.isModalOpen = false;
    this.socialLink = '';
  }

  copyLink(): void {
    if (this.socialLink) {
      navigator.clipboard.writeText(this.socialLink);
      alert('Enlace copiado al portapapeles.');
    }
  }

  clearLink(): void {
    this.socialLink = '';
  }

  saveSocialLink(): void {
    alert(`Enlace guardado para ${this.selectedSocial}: ${this.socialLink}`);
    this.closeSocialModal();
  }

  openCustomChipModal(index: number): void {
    // Método vacío
  }

  filterIcons(): void {
    if (!this.searchQuery) {
      this.filteredIcons = [...this.availableIcons]; // Restaurar todos los íconos si no hay búsqueda
      return;
    }

    this.filteredIcons = this.availableIcons.filter(icon =>
      icon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectIcon(icon: { name: string; class: string }): void {
    if (!icon) {
      console.error('Ícono no válido seleccionado.');
      return;
    }

    this.selectedIconClass = icon.class;
    this.searchQuery = icon.name;
  }
}

