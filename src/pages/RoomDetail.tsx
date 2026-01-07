import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Plus, Settings, Lightbulb, Snowflake, Tv, Plug, 
  Thermometer, Droplets, Power, ChevronRight, QrCode, Trash2, X,
  Lamp, LampDesk, Fan, Flame, Speaker, Monitor, Wind, Coffee,
  Utensils, Waves, DoorOpen, BatteryCharging, PanelTop
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useDeviceContext } from "@/context/DeviceContext";
import { Device, DeviceType, deviceTypeColors, deviceTypeLabels } from "@/types/devices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const iconMap: Record<string, typeof Lightbulb> = {
  Lightbulb, Lamp, LampDesk, Snowflake, Flame, Fan, Tv, Speaker, Monitor,
  Wind, Coffee, Utensils, Waves, DoorOpen, BatteryCharging, Plug, PanelTop,
  Droplets, Thermometer
};

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoomById, getDevicesByRoom, toggleDevice, updateDevice, addDevice, removeDevice } = useDeviceContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState<DeviceType>("light");

  const room = getRoomById(roomId || "");
  const devices = getDevicesByRoom(roomId || "");

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Room not found</p>
      </div>
    );
  }

  const getIcon = (iconName: string) => iconMap[iconName] || Plug;

  const devicesByType = devices.reduce((acc, device) => {
    if (!acc[device.type]) acc[device.type] = [];
    acc[device.type].push(device);
    return acc;
  }, {} as Record<DeviceType, Device[]>);

  const handleAddDevice = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      if (newDeviceName.trim()) {
        const iconOptions: Record<DeviceType, string> = {
          light: 'Lightbulb',
          climate: 'Fan',
          entertainment: 'Tv',
          appliance: 'Plug',
        };
        
        addDevice({
          name: newDeviceName,
          type: newDeviceType,
          isOn: false,
          roomId: roomId || "",
          icon: iconOptions[newDeviceType],
          brightness: newDeviceType === 'light' ? 100 : undefined,
          colorTemp: newDeviceType === 'light' ? 'neutral' : undefined,
          volume: newDeviceType === 'entertainment' ? 50 : undefined,
          temperature: newDeviceType === 'climate' ? 22 : undefined,
        });
        toast.success("Device added successfully!", {
          description: `${newDeviceName} has been registered to ${room.name}`,
        });
        setNewDeviceName("");
        setShowAddDevice(false);
      }
    }, 2000);
  };

  const handleDeleteDevice = (deviceId: string) => {
    removeDevice(deviceId);
    toast.success("Device removed");
  };

  const typeIcons: Record<DeviceType, typeof Lightbulb> = {
    light: Lightbulb,
    climate: Snowflake,
    entertainment: Tv,
    appliance: Plug,
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                isEditing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowAddDevice(true)}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-foreground">{room.name}</h1>
        <p className="text-muted-foreground mt-1">
          {devices.filter(d => d.isOn).length} of {devices.length} devices active
        </p>
        
        {/* Room Stats */}
        <div className="flex items-center gap-6 mt-4">
          {room.temperature && (
            <div className="flex items-center gap-2 bg-card px-3 py-2 rounded-full">
              <Thermometer className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{room.temperature}°C</span>
            </div>
          )}
          {room.humidity && (
            <div className="flex items-center gap-2 bg-card px-3 py-2 rounded-full">
              <Droplets className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{room.humidity}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Devices by Type */}
      <div className="px-6 space-y-6">
        {(Object.keys(devicesByType) as DeviceType[]).map((type) => {
          const TypeIcon = typeIcons[type];
          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-3">
                <TypeIcon className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">{deviceTypeLabels[type]}</h3>
                <span className="text-muted-foreground text-sm">
                  ({devicesByType[type].filter(d => d.isOn).length}/{devicesByType[type].length})
                </span>
              </div>
              
              <div className="space-y-3">
                {devicesByType[type].map((device) => {
                  const Icon = getIcon(device.icon);
                  return (
                    <div
                      key={device.id}
                      className={`bg-card rounded-2xl p-4 shadow-sm transition-all ${
                        selectedDevice?.id === device.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div 
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                          onClick={() => setSelectedDevice(selectedDevice?.id === device.id ? null : device)}
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            device.isOn ? deviceTypeColors[device.type] : 'bg-muted text-muted-foreground'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{device.name}</h4>
                            <p className="text-muted-foreground text-sm">
                              {device.isOn ? 'On' : 'Off'}
                              {device.brightness !== undefined && device.isOn && ` • ${device.brightness}%`}
                              {device.temperature !== undefined && device.isOn && ` • ${device.temperature}°C`}
                              {device.volume !== undefined && device.isOn && ` • Vol ${device.volume}%`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isEditing && (
                            <button
                              onClick={() => handleDeleteDevice(device.id)}
                              className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <Switch
                            checked={device.isOn}
                            onCheckedChange={() => toggleDevice(device.id)}
                          />
                        </div>
                      </div>
                      
                      {/* Expanded Controls */}
                      {selectedDevice?.id === device.id && device.isOn && (
                        <div className="mt-4 pt-4 border-t border-border space-y-4">
                          {device.brightness !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Brightness</span>
                                <span className="text-foreground font-medium">{device.brightness}%</span>
                              </div>
                              <Slider
                                value={[device.brightness]}
                                onValueChange={([val]) => updateDevice(device.id, { brightness: val })}
                                max={100}
                                step={1}
                              />
                            </div>
                          )}
                          {device.colorTemp !== undefined && (
                            <div>
                              <span className="text-sm text-muted-foreground mb-2 block">Color Temperature</span>
                              <div className="flex gap-2">
                                {(['warm', 'neutral', 'cool'] as const).map((temp) => (
                                  <button
                                    key={temp}
                                    onClick={() => updateDevice(device.id, { colorTemp: temp })}
                                    className={`flex-1 py-2 rounded-lg text-sm capitalize transition-colors ${
                                      device.colorTemp === temp
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                                  >
                                    {temp}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {device.volume !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Volume</span>
                                <span className="text-foreground font-medium">{device.volume}%</span>
                              </div>
                              <Slider
                                value={[device.volume]}
                                onValueChange={([val]) => updateDevice(device.id, { volume: val })}
                                max={100}
                                step={1}
                              />
                            </div>
                          )}
                          {device.temperature !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Temperature</span>
                                <span className="text-foreground font-medium">{device.temperature}°C</span>
                              </div>
                              <Slider
                                value={[device.temperature]}
                                onValueChange={([val]) => updateDevice(device.id, { temperature: val })}
                                min={16}
                                max={30}
                                step={1}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Device Dialog */}
      <Dialog open={showAddDevice} onOpenChange={setShowAddDevice}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
          </DialogHeader>
          
          {isScanning ? (
            <div className="py-12 flex flex-col items-center gap-4">
              <div className="w-32 h-32 border-4 border-primary border-dashed rounded-2xl flex items-center justify-center animate-pulse">
                <QrCode className="w-16 h-16 text-primary" />
              </div>
              <p className="text-muted-foreground">Scanning for device...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Device Name</label>
                <input
                  type="text"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="Enter device name"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Device Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(deviceTypeLabels) as DeviceType[]).map((type) => {
                    const TypeIcon = typeIcons[type];
                    return (
                      <button
                        key={type}
                        onClick={() => setNewDeviceType(type)}
                        className={`p-3 rounded-xl flex items-center gap-2 transition-colors ${
                          newDeviceType === type
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <TypeIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{deviceTypeLabels[type]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={handleAddDevice}
                disabled={!newDeviceName.trim()}
                className="w-full py-3 gradient-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Scan & Add Device
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomDetail;