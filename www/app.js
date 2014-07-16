
$(function () {

    var contentString = new Array();
    function strat_masiv() {
        var clo_in=0;
        $('#ImageMapsCom .hause_items_shows').each(function (_index, _label) {
            var blocks = $(_label);
            contentString[clo_in] = new Array();
            var bjects_alt = $(blocks).attr('alt');
            var example = $(blocks).attr('data-maps').split(',');
            var max_x_dpi = 39.05776,
                max_x_px = 7986,
                min_x_dpi = 39.048469,
                max_y_dpi = 51.74439,
                max_y_px = 3606,
                min_y_dpi = 51.747;
            contentString[clo_in][0] = $(blocks).attr('title');
            contentString[clo_in][1] = $(blocks).html();
            //Правый Y
            contentString[clo_in][2] = min_y_dpi+((((parseInt(example[1], 10)*100)/max_y_px)*(max_y_dpi-min_y_dpi))/100);
            //Правый X
            contentString[clo_in][3] = min_x_dpi+((((parseInt(example[0], 10)*100)/max_x_px)*(max_x_dpi-min_x_dpi))/100);
            contentString[clo_in][4] = $(blocks).attr('href');
            contentString[clo_in][5] = '';
            //Левый Y
            contentString[clo_in][6] = min_y_dpi+((((parseInt(example[3], 10)*100)/max_y_px)*(max_y_dpi-min_y_dpi))/100);
            //Правый X
            contentString[clo_in][7] = min_x_dpi+((((parseInt(example[2], 10)*100)/max_x_px)*(max_x_dpi-min_x_dpi))/100);
            clo_in++

        });
        console.log('Y='+contentString[0][6]+' x='+contentString[0][7]);
    }


    var options = {
        tileUrlTemplate: "./%z/tile-%x-%y.png",
        controls: {
            typeControl: true,
            miniMap: false,
            toolBar: true,
            scaleLine: true
        },
        scrollZoomEnabled: true,
        mapCenter: new YMaps.GeoPoint(39.053422865736, 51.7455485845738),
        backgroundMapType: YMaps.MapType.NONE,
        mapZoom: 17,
        isTransparent: true,
        smoothZooming: false,
        layerKey: "my#layer",
        mapType: {
            name: "Генплан",
            textColor: "#000000"
        },
        copyright: "",
        layerMinZoom: 16,
        layerMaxZoom: 20
    };

    ymaps.ready(function () {
        $(function () {
            strat_masiv();
        });
        // Передаем его в конструктор класса TilerConverter и получаем ссылку на карту.
        var myMap = (new TilerConverter(options)).getMap();
        //создаём точки
        for (var i = 0; i < contentString.length; i++) {
            /*contentString[i][5] = new ymaps.Placemark([contentString[i][2], contentString[i][3]], {
             balloonContentHeader: contentString[i][0],
             balloonContentBody: contentString[i][1],
             balloonContentFooter: "<a href='" + contentString[i][4] + "'>подробней</a>",
             hintContent: contentString[i][0]
             }, {
             hideIcon: true,
             /*
             hideIcon: true,
             iconImageHref: 'icon.png', // картинка иконки
             iconImageSize: [12, 20], // размеры картинки
             iconImageOffset: [-6, -10], // смещение картинки
             openEmptyBalloon: true
             }
             );*/
            contentString[i][5] = new ymaps.Rectangle([
                [contentString[i][2],contentString[i][3]],
                [contentString[i][6],contentString[i][7]]
            ], {
                balloonContentHeader: contentString[i][0],
                balloonContent: contentString[i][1],
                balloonContentFooter: "<a href='" + contentString[i][4] + "'>подробней</a>",
                hintContent: contentString[i][0]
            }, {
                fillColor: '#7df9ff33',
                fillOpacity: 0.5,
                strokeColor: '#0000FF',
                strokeOpacity: 0.5,
                strokeWidth: 2,
                borderRadius: 6
            });
            myMap.geoObjects.add(contentString[i][5]);
        };

        function stosis() {
            var position = $('.ymaps-b-zoom__mark').position();
            var position_object = $('.ymaps-layers-pane').position();
            var width = $('#YMapsID').width();
            var height = $('#YMapsID').height();
            if (position.top == '3') {
                var object_width = 434,
                    object_height = 197;
                if ((myMap.behaviors.isEnabled('drag'))) {
                    myMap.behaviors.disable('drag');
                }
            } else {
                if (position.top == '10') {
                    var object_width = 868,
                        object_height = 394;
                    myMap.behaviors.disable('drag');
                    if ((width < object_width) && !(myMap.behaviors.isEnabled('drag'))) {
                        myMap.behaviors.enable('drag');
                    }
                } else {
                    if (position.top == '17') {
                        var object_width = 1736,
                            object_height = 788;
                        myMap.behaviors.disable('drag');
                        if ((width < object_width) && !(myMap.behaviors.isEnabled('drag'))) {
                            myMap.behaviors.enable('drag');
                        }
                    } else {
                        if (position.top == '24') {
                            var object_width = 3472,
                                object_height = 1576;
                            myMap.behaviors.disable('drag');
                            if ((width < object_width) && !(myMap.behaviors.isEnabled('drag'))) {
                                myMap.behaviors.enable('drag');
                            }
                        } else {
                            if (position.top == '31') {
                                var object_width = 6944,
                                    object_height = 3154;
                                myMap.behaviors.disable('drag');
                                if ((width < object_width) && !(myMap.behaviors.isEnabled('drag'))) {
                                    myMap.behaviors.enable('drag');
                                }
                            } else {
                                console.log('zoom = error');
                            }
                        }
                    }
                }
            }
        }

    });
});


/**
 * @deprecated
 * Для совместимости с API 1.x
 */
 

YMaps = {
    MapType: {
        MAP: 'yandex#map',
        SATELLITE: 'yandex#satellite',
        HYBRID: 'yandex#hybrid',
        NONE: ''
    },
    GeoPoint: function (long, lat) {
        return [lat, long];
    }
};

/**
 * Класс конвертора для опций пользовательского слоя.
 * @class
 * @name TilerConverter
 * @param {Object} options Опции, сгенеренные приложением "Подготовка слоя тайлов".
 */
function TilerConverter(options) {
    this._options = options;

    // Создание слоя.
    this._layer = this._createLayer();
    // Добавим слой в хранилище слоев под ключом options.layerKey.
    ymaps.layer.storage.add(options.layerKey, this._layer);

    // Создание типа карты.
    this._mapType = this._createMapType();
    // Добавим в хранилище типов карты.
    ymaps.mapType.storage.add(options.layerKey, this._mapType);

    // Создание карты.
    this._map = this._createMap();
    // Добавление карте контролов и поведений.
    this
        ._addControls()
        ._enableBehaviors();
}

/**
 * @lends TilerConverter.prototype.
 */
TilerConverter.prototype = {
    /**
     * @constructor
     */
    constructor: TilerConverter,
    /**
     * Возвращает экземпляр карты.
     * @function
     * @name TilerConverter.getMap
     * @returns {ymaps.Map} Карта.
     */
    getMap: function () {
        return this._map;
    },
    /**
     * Возвращает конструктор пользовательского слоя.
     * @function
     * @name TilerConverter.getLayer
     * @returns {Function} Конструктор пользовательского слоя.
     */
    getLayer: function () {
        return this._layer;
    },
    /**
     * Возвращает экземпляр пользовательского типа карты.
     * @function
     * @name TilerConverter.getMapType
     * @returns {ymaps.MapType} Пользовательский тип карты.
     */
    getMapType: function () {
        return this._mapType;
    },
    /**
     * Создание экземпляра карты.
     * @private
     * @function
     * @name TilerConverter._createMap
     * @returns {ymaps.Map} Карта.
     */
    _createMap: function () {
        var options = this._options;
		
        return new ymaps.Map(options.mapID || "YMapsID", {
            center: options.mapCenter,
            zoom: options.mapZoom,
            type: options.layerKey,
            behaviors: ['default']
        }, {
            adjustZoomOnTypeChange: true
        });
    },
    /**
     * Создание конструктора пользовательского слоя.
     * @private
     * @function
     * @name TilerConverter._createLayer
     * @returns {Function} Конструктор пользовательского слоя.
     */
    _createLayer: function () {
        var options = this._options;

        return function () {
            var layer = new ymaps.Layer(options.tileUrlTemplate, {
                    tileTransparent: options.isTransparent
                });

            // Копирайты
            if(options.copyright) {
                layer.getCopyrights = function () {
                    var promise = new ymaps.util.Promise();

                    promise.resolve(options.copyright);

                    return promise;
                };
            }

            // Диапазон доступных масштабов на данном слое карты (надо вручную дописать layerMaxZoom/layerMinZoom в options)
            if(options.layerMaxZoom >= 0 && options.layerMinZoom >= 0) {
                layer.getZoomRange = function () {
                    var promise = new ymaps.util.Promise();

                    promise.resolve([options.layerMinZoom, options.layerMaxZoom]);

                    return promise;
                };
            }

            return layer;
        };
    },
    /**
     * Создание экземпляра пользовательского типа карты.
     * @private
     * @function
     * @name TilerConverter._createMapType
     * @returns {ymaps.MapType} Пользовательский тип карты.
     */
    _createMapType: function () {
        var options = this._options,
            layers = options.backgroundMapType?
                ymaps.mapType.storage.get(options.backgroundMapType).getLayers() : [];

        return new ymaps.MapType(options.mapType.name, layers.concat([options.layerKey]));
    },
    /**
     * Добавление контролов.
     * @private
     * @function
     * @name TilerConverter._addControls
     * @returns {TilerConverter} Экземпляр конвертера.
     */
    _addControls: function () {
        var map = this._map,
            options = this._options,
            mapTypes = [
                // Наш тип.
                options.layerKey,
                // Все доступные в АПИ типы (не нужное закомментировать)
                'yandex#map',
                'yandex#satellite',
                'yandex#hybrid',
                'yandex#publicMap',
                'yandex#publicMapHybrid'
            ];

        if(options.controls.typeControl) {
            map.controls.add(new ymaps.control.TypeSelector(mapTypes));
        }
        if(options.controls.miniMap) {
            map.controls.add(new ymaps.control.MiniMap({ type: options.layerKey }));
            // Раскомментировать если нужно чтобы миникарта показывала схему, а не наш слой.
            // map.controls.add('miniMap');
        }
        if(options.controls.toolBar) {
            map.controls.add('mapTools');
        }
        if(options.controls.scaleLine) {
            map.controls.add('scaleLine');
        }
        map.controls.add('zoomControl');

        return this;
    },
    /**
     * Включение поведений карты.
     * @private
     * @function
     * @name TilerConverter._enableBehaviors
     * @returns {TilerConverter} Экземпляр конвертера.
     */
    _enableBehaviors: function () {
        if(this._options.scrollZoomEnabled) {
            this._map.behaviors.enable('scrollZoom');
        }

        return this;
    }
};