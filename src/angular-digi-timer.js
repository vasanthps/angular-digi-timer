var digiTimerModule = angular.module('digiTimer', []).
directive('digiTimer', function($timeout) {
    var mode = "system";
    var format = "second";
    var is24Hour = true;
    var style = "";
    
    return {
        restrict: 'EA',
        require: '?ngModel',
        template: '<label class="digi-timer-main-style">{{ display.time }}</label>',
        compile: function(tElement, transclude, tattrs) {
            return {
                pre: function(scope, elem, attrs) {
                    if(attrs.digiMode)
                        mode = attrs.digiMode;
                    if(attrs.digiFormat)
                        format = attrs.digiFormat;
                    if(attrs.hasOwnProperty("digiTwelveHour"))
                        is24Hour = false;
                    if(attrs.digiStyle)
                        style = attrs.digiStyle;
                    
                    
                },
                post: function(scope, elem, attrs) {
                    scope.display = {};
    
                    scope.initializeTime = function() {
                        if(scope.display.mode.toUpperCase() === "SYSTEM") {
                            scope.displaySystemTime(scope.display.format);
                        }
                    };

                    scope.displaySystemTime = function(format) {
                        var currentTime = new Date();
                        var meridiem = "AM";
                        var cHour = currentTime.getHours();
                        if(!scope.display.is24Hour) {
                            if(cHour > 12) {
                                cHour = cHour - 12;
                                meridiem = "PM"
                            } else if(cHour === 0) {
                                cHour = 12;
                                meridiem = "PM";
                            }
                        }

                        var cMin = currentTime.getMinutes();
                        var cSec = currentTime.getSeconds();
                        var cMs = currentTime.getMilliseconds();
                        var m =  + scope.display.is24Hour? "": meridiem;
                        $timeout(function() {
                            scope.display.time = ("0" + cHour).slice(-2) + ":" + ("0" + cMin).slice(-2) + ":" + ("0" + cSec).slice(-2) + " " + m;
                            $timeout(scope.displaySystemTime, 500);
                        }, 0);

                    };
                    
                    scope.startCountDown = function(timeInSecs) {
                        
                    };
                    
                    scope.display.mode = mode;
                    scope.display.format = format;
                    scope.display.is24Hour = is24Hour;
                    scope.display.style = style;
                    
                    scope.initializeTime();
                
                }
            };
        }
        
    };
    
});