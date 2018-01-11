/**
 * Created by elporfirio on 20/08/2015.
 */

(function(){

    var erroriFyModule;

    erroriFyModule = angular.module('ep.erroriFy', []);

    erroriFyModule.directive('epErrors', [
        '$timeout',
        'showErrorsConfig',
        function($timeout, showErrorsConfig){
            var getShowSuccess,
                mainFunction,
                validateFormControl,
                validationRules,
                errorsMessages,
                generateValidity;

            validationRules = {
                //'email' : /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                'int': /^\d+$/,
                'float': /^[0-9]*[.][0-9]+$/,
                'alfanumerico': /^[a-zA-Z0-9_]*$/,
                'texto': /^[a-zA-Z0-9_\ áéíóúÁÉÍÓÚñÑ\'\"\,\;\.\:\-\?\¿\!\¡\@]+$/,
                //'texto': /^[a-zA-Z0-9_\ áéíóúÁÉÍÓÚñÑ\'\"\,\;\.\:\-\?\¿\!\¡]+$/,
                'date': /^\d{4}-\d{1,2}-\d{1,2}$/
            };

            errorsMessages = {
                required : 'Este campo es requerido',
                email : 'Este email no tiene un formato válido',
                minlength : 'Requiere un minimo de {{x}} carácteres',
                maxlength : 'Requiere un máximo de {{x}} carácteres',
                alfanumerico : 'Este campo solo acepta carácteres alfanúmericos',
                texto : 'Este campo solo acepta textos, números y los siguientes simbolos (\",\" \, \".\" \, \";\" \, )',
                iguala : 'Los campos de contraseña no coinciden'
            };

            getShowSuccess = function (options) {
                var showSuccess;
                showSuccess = showErrorsConfig.showSuccess;
                if (options && options.showSuccess != null) {
                    showSuccess = options.showSuccess;
                }
                return showSuccess;
            };

            validateFormControl = function(validationRule, value){
                if(value.match(validationRules[validationRule]) == null){
                    return validationRule;
                }
                return null;
            };

            generateValidity = function(dataValidation, currentForm, targetForm){
                if(dataValidation !== undefined){
                    var respuesta = validateFormControl(dataValidation, currentForm.val());
                    if(respuesta !== null){
                        targetForm.$setValidity(dataValidation, false);
                    } else {
                        targetForm.$setValidity(dataValidation, true);
                    }
                    return true;
                } else {
                    if(currentForm.attr('ng-minlength') !== undefined && currentForm.attr('ng-minlength') != ""){
                        var minimo = parseInt(currentForm.attr('ng-minlength'));
                        errorsMessages.minlength = errorsMessages.minlength.replace('{{x}}', minimo);
                        var stringactual = currentForm.val();

                        if(stringactual.length < minimo){
                            targetForm.$setValidity('minlength', false);
                        }
                    }
                    if(currentForm.attr('ng-maxlength') !== undefined && currentForm.attr('ng-maxlength') != ""){
                        var maximo = parseInt(currentForm.attr('ng-maxlength'));
                        errorsMessages.maxlength = errorsMessages.maxlength.replace('{{x}}',maximo);
                        var stringactual = currentForm.val();

                        if(stringactual.length > maximo){
                            targetForm.$setValidity('maxlength', false);
                        }
                    }
                    if(currentForm.attr('iguala') !== undefined && currentForm.attr('iguala') != ""){
                        var stringactual = currentForm.val();

                        if(stringactual != currentForm.attr('iguala')){
                            targetForm.$setValidity('iguala', false);
                        } else {
                            targetForm.$setValidity('iguala', true);
                        }
                    }
                }
                return false;
            };

            mainFunction = function (scope, element, attrs, formCtrl) {
                var blurred,
                    inputElement,
                    inputName,
                    $currentInput,
                    options,
                    showSuccess,
                    toggleClasses;

                blurred = false;
                options = scope.$eval(attrs.epErrors);
                showSuccess = getShowSuccess(options);
                inputElement = $(element).find('[name]');
                $currentInput = $(inputElement[0]);
                inputName = $currentInput.attr('name');

                if (!inputName) {
                    throw 'show-errors element has no child input elements with a \'name\' attribute';
                }

                $currentInput.on('blur', function () {
                    blurred = true;
                    generateValidity($currentInput.data('validation'), $currentInput, formCtrl[inputName]);

                    return toggleClasses(formCtrl[inputName].$invalid);
                });

                scope.$watch(function () {
                    return formCtrl[inputName] && formCtrl[inputName].$invalid;
                }, function (invalid) {
                    if (!blurred) {
                        return;
                    }
                    return toggleClasses(invalid);
                });

                scope.$on('show-errors-check-validity', function () {
                    generateValidity($currentInput.data('validation'), $currentInput, formCtrl[inputName]);
                    return toggleClasses(formCtrl[inputName].$invalid);
                });

                scope.$on('show-errors-reset', function () {
                    return $timeout(function () {
                        element.removeClass('has-error');
                        element.removeClass('has-success');
                        $(element).find(".error-msg").remove();

                        return blurred = false;
                    }, 0, false);
                });


                return toggleClasses = function (invalid) {
                    element.toggleClass('has-error', invalid);
                    element.toggleClass('has-feedback', true);

/*                    var elFormGroup = element.closest('.form-group');
                    elFormGroup.find('.glyphicon').toggleClass('glyphicon-remove', invalid);*/

                    $(element).find('.form-control-feedback').toggleClass('glyphicon-remove', invalid);

                    if(formCtrl[inputName].$invalid){
                        $(element).find('.error-msg').remove();
                        var unique = true;
                        angular.forEach(formCtrl[inputName].$error, function(value, key) {
                            if(unique){
                                if(value){
                                    var customElemento = $(element.find('input', 'textarea', 'select')[0]).parent();
                                    if(customElemento.hasClass("input_group")){
                                        customElemento.parent();
                                    }
                                    customElemento = $(element.find('input', 'textarea', 'select')[0]).closest('.form-group');
                                    //$('<p class="error-msg help-block">' + errorsMessages[key] +'</p>').appendTo(element);
                                    customElemento.append('<p class="error-msg help-block">' + errorsMessages[key] +'</p>');
                                    unique = false;
                                }
                            }
                        });
                    }

                    if(formCtrl[inputName].$valid){

                        $(element).find('.error-msg').remove();
                    }

                    if (showSuccess) {
                        $(element).find('.form-control-feedback').toggleClass('glyphicon-ok', !invalid);

                        return element.toggleClass('has-success', !invalid);
                    }
                };
            };

            return {
                restrict: 'A',
                require:  '^form',
                compile: function (elem, attrs) {
                    if (!elem.hasClass('form-group')) {
                        throw 'show-errors element does not have the \'form-group\' class';
                    }
                    return mainFunction;
                }
            };
        }
    ]);

    erroriFyModule.provider('showErrorsConfig', function () {
        var _showSuccess;
        _showSuccess = false;

        this.showSuccess = function (showSuccess) {
            return _showSuccess = showSuccess;
        };

        this.$get = function () {
            return { showSuccess: _showSuccess };
        };
    });

}).call(this);
