"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, usuarioService) {
        this.fb = fb;
        this.usuarioService = usuarioService;
        this.formularioEnviado = false; //para saber cuando se envia el formulario
        this.formularioRegistro = this.fb.group({
            nombre: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            pass: ['123', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            pass2: ['123', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            terminos: [false, forms_1.Validators.required]
        }, {
            validators: this.passwordIguales('pass', 'pass2')
        });
    }
    RegisterComponent.prototype.crearUsuario = function () {
        this.formularioEnviado = true;
        console.log(this.formularioRegistro.value);
        if (this.formularioRegistro.invalid) {
            return;
        }
        //Realizarr el posteo
        this.usuarioService.crearUsuario(this.formularioRegistro.value);
    };
    RegisterComponent.prototype.campoNoValido = function (campo) {
        if (this.formularioRegistro.get(campo).invalid && this.formularioEnviado) {
            return true;
        }
        else {
            return false;
        }
    };
    RegisterComponent.prototype.contrasenasNoValidas = function () {
        var pass1 = this.formularioRegistro.get('pass').value;
        var pass2 = this.formularioRegistro.get('pass2').value;
        if (pass1 !== pass2 && this.formularioEnviado) {
            return true;
        }
        else {
            return false;
        }
    };
    RegisterComponent.prototype.aceptaTerminos = function () {
        return !this.formularioRegistro.get('terminos').value && this.formularioEnviado;
    };
    RegisterComponent.prototype.passwordIguales = function (pass1Name, pass2Name) {
        return function (formGroup) {
            var pass1Control = formGroup.get(pass1Name);
            var pass2Control = formGroup.get(pass2Name);
            if (pass1Control.value === pass2Control.value) {
                pass2Control.setErrors(null);
            }
            else {
                pass2Control.setErrors({ noEsIgual: true });
            }
        };
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css'
            ]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
