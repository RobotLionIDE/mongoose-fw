load('api_config.js');
load('api_gpio.js');
load('api_pwm.js');
load('api_rpc.js');
load('api_timer.js');
load('api_events.js');
load('api_bt_gap.js');
//load('api_bt_gatt.js');
load('api_bt_gattc.js');
load('api_bt_gatts.js');
load('api_arduino_sh1106.js');

let d = Adafruit_SH1106.create_i2c(128, 64);

load('lion_bootstrap.js');
load('lion_fw.js');

LionSetup();
FWInit();

GATTS.registerService(
    "5bf81ab8-db52-11ea-87d0-0242ac130003",
    GATT.SEC_LEVEL_NONE,
    [
        ["3da7ecbe-db52-11ea-87d0-0242ac130003", GATT.PROP_RWNI(0, 1, 0, 0)],
    ],
    function svch(c, ev, arg) {
        if(ev === GATTS.EV_CONNECT) {
            return GATT.STATUS_OK;
            //return 0;
        } else if (ev === GATTS.EV_WRITE) {
            LionDo(arg.data);
            return GATT.STATUS_OK;
            //return 0;
        } else if (ev === GATTS.EV_DISCONNECT) {
            return GATT.STATUS_OK;
            //return 0;

        }
        return GATT.STATUS_REQUEST_NOT_SUPPORTED;
    }
  );

//************************** Core RPC **************************
RPC.addHandler('LION.firmware', function(args){
  return Cfg.get('lion.firmware_version');
});

RPC.addHandler('LION.fileware', function(args){
  return Cfg.get('lion.fileware_version');
});

RPC.addHandler('LION.start', function(args){
  return LionStart();
});

RPC.addHandler('LION.stop', function(args){
  return LionStop();
});
