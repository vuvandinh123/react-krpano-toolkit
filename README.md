# 🎯 Krpano Command Hook - Tất cả ví dụ sử dụng

## 📋 Mục lục
1. [Scene Operations](#scene-operations)
2. [View Operations](#view-operations)
3. [Element Operations](#element-operations)
4. [Sound Operations](#sound-operations)
5. [Control Operations](#control-operations)
6. [Utility Operations](#utility-operations)
7. [Base Execute Function](#base-execute-function)
8. [Shortcuts](#shortcuts)
9. [Kết hợp nhiều thao tác](#kết-hợp-nhiều-thao-tác)

---

## Scene Operations

### 1. loadScene() - Chuyển scene
**Mục đích**: Chuyển đổi giữa các scene trong tour 360°

```tsx
const krpano = useKrpanoCommand();

// ✅ Chuyển scene cơ bản
krpano.scene.loadScene('bedroom');

// ✅ Chuyển scene với hiệu ứng blend
krpano.scene.loadScene('kitchen', { 
  blend: 'BLEND(2.0)', // Fade 2 giây
  flags: 'MERGE'       // Merge với scene hiện tại
});

// ✅ Chuyển scene với hiệu ứng crossfade
krpano.scene.loadScene('livingroom', { 
  blend: 'CROSSBLEND(1.5)' // Crossfade 1.5 giây
});

// ✅ Chuyển scene ngay lập tức
krpano.scene.loadScene('bathroom', { 
  blend: 'NOBLEND' 
});
```

### 2. removeScene() - Xóa scene
**Mục đích**: Xóa scene khỏi bộ nhớ để tiết kiệm tài nguyên

```tsx
// ✅ Xóa scene không cần thiết
krpano.scene.removeScene('old_scene');

// ✅ Xóa nhiều scene trong loop
const unusedScenes = ['temp1', 'temp2', 'temp3'];
unusedScenes.forEach(scene => {
  krpano.scene.removeScene(scene);
});
```

### 3. addScene() - Thêm scene mới
**Mục đích**: Thêm scene động vào tour

```tsx
// ✅ Thêm scene trống
krpano.scene.addScene('new_scene');

// ✅ Thêm scene và load XML
krpano.scene.addScene('outdoor', '/xml/outdoor.xml');

// ✅ Thêm scene cho gallery động
const addGalleryScene = (imageUrl: string, sceneName: string) => {
  krpano.scene.addScene(sceneName);
  krpano.utility.set(`scene[${sceneName}].image.sphere`, imageUrl);
};
```

### 4. copyScene() - Sao chép scene
**Mục đích**: Tạo bản sao của scene để tùy chỉnh

```tsx
// ✅ Sao chép scene làm template
krpano.scene.copyScene('master_bedroom', 'bedroom_variant');

// ✅ Tạo nhiều variant của cùng một scene
const createVariants = (baseScene: string) => {
  krpano.scene.copyScene(baseScene, `${baseScene}_night`);
  krpano.scene.copyScene(baseScene, `${baseScene}_day`);
};
```

---

## View Operations

### 1. lookAt() - Nhìn về hướng cụ thể
**Mục đích**: Điều khiển hướng nhìn camera với animation mượt

```tsx
// ✅ Nhìn về hướng cụ thể với animation
krpano.view.lookAt(90, 0, 80, { 
  smooth: true, 
  time: 2.0, 
  tween: 'easeInOutSine' 
});

// ✅ Nhìn ngay lập tức (không animation)
krpano.view.lookAt(180, -10, 90, { smooth: false });

// ✅ Tạo camera path (tour tự động)
const cameraPath = [
  { h: 0, v: 0, f: 90 },
  { h: 90, v: 10, f: 70 },
  { h: 180, v: -5, f: 100 },
  { h: 270, v: 5, f: 80 }
];

const startAutoTour = () => {
  cameraPath.forEach((point, index) => {
    setTimeout(() => {
      krpano.view.lookAt(point.h, point.v, point.f, {
        smooth: true,
        time: 3.0,
        tween: 'easeInOutQuad'
      });
    }, index * 4000);
  });
};

// ✅ Nhìn về hotspot
const lookAtHotspot = (hotspotName: string) => {
  const h = krpano.utility.get(`hotspot[${hotspotName}].ath`);
  const v = krpano.utility.get(`hotspot[${hotspotName}].atv`);
  krpano.view.lookAt(h, v, undefined, { smooth: true, time: 1.5 });
};
```

### 2. lookTo() - Di chuyển camera đến vị trí
**Mục đích**: Di chuyển camera mượt đến tọa độ cụ thể

```tsx
// ✅ Di chuyển mượt đến vị trí
krpano.view.lookTo(45, 15, { smooth: true, time: 1.0 });

// ✅ Snap đến vị trí ngay lập tức
krpano.view.lookTo(90, 0, { smooth: false });

// ✅ Tạo shake effect
const shakeCamera = () => {
  const original = {
    h: krpano.utility.get('view.hlookat'),
    v: krpano.utility.get('view.vlookat')
  };
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      krpano.view.lookTo(
        original.h + Math.random() * 4 - 2,
        original.v + Math.random() * 4 - 2,
        { smooth: false }
      );
    }, i * 50);
  }
  
  setTimeout(() => {
    krpano.view.lookTo(original.h, original.v, { smooth: true, time: 0.5 });
  }, 500);
};
```

### 3. zoomTo() - Zoom camera
**Mục đích**: Thay đổi field of view (độ rộng góc nhìn)

```tsx
// ✅ Zoom in mượt
krpano.view.zoomTo(30, { smooth: true, time: 1.5 }); // Zoom in

// ✅ Zoom out mượt
krpano.view.zoomTo(120, { smooth: true, time: 1.0 }); // Zoom out

// ✅ Zoom ngay lập tức
krpano.view.zoomTo(90, { smooth: false }); // Standard view

// ✅ Tạo zoom pulse effect
const zoomPulse = () => {
  const originalFov = krpano.utility.get('view.fov');
  krpano.view.zoomTo(originalFov - 20, { smooth: true, time: 0.3 });
  setTimeout(() => {
    krpano.view.zoomTo(originalFov, { smooth: true, time: 0.3 });
  }, 300);
};

// ✅ Zoom levels preset
const zoomLevels = {
  wide: 120,
  normal: 90,
  medium: 60,
  close: 30,
  macro: 15
};

const setZoomLevel = (level: keyof typeof zoomLevels) => {
  krpano.view.zoomTo(zoomLevels[level], { smooth: true, time: 1.0 });
};
```

### 4. moveCamera() - Di chuyển camera theo hướng
**Mục đích**: Di chuyển camera theo các hướng cơ bản

```tsx
// ✅ Di chuyển cơ bản
krpano.view.moveCamera('up', 10);    // Lên 10 độ
krpano.view.moveCamera('down', 5);   // Xuống 5 độ
krpano.view.moveCamera('left', 15);  // Trái 15 độ
krpano.view.moveCamera('right', 20); // Phải 20 độ

// ✅ Tạo camera drift effect
const startDrift = () => {
  const drift = () => {
    krpano.view.moveCamera('right', 0.5);
    setTimeout(drift, 100);
  };
  drift();
};

// ✅ Keyboard controls simulation
const handleKeyboard = (key: string) => {
  switch(key) {
    case 'ArrowUp': krpano.view.moveCamera('up', 5); break;
    case 'ArrowDown': krpano.view.moveCamera('down', 5); break;
    case 'ArrowLeft': krpano.view.moveCamera('left', 5); break;
    case 'ArrowRight': krpano.view.moveCamera('right', 5); break;
  }
};
```

### 5. stopMovement() - Dừng chuyển động
**Mục đích**: Dừng tất cả animation và chuyển động

```tsx
// ✅ Dừng tất cả chuyển động
krpano.view.stopMovement();

// ✅ Emergency stop cho auto tour
const emergencyStop = () => {
  krpano.view.stopMovement();
  console.log('Tour stopped by user');
};
```

---

## Element Operations

### 1. show() - Hiển thị element
**Mục đích**: Hiển thị hotspot/layer/plugin với hoặc không có animation

```tsx
// ✅ Hiển thị ngay lập tức
krpano.element.show('hotspot', 'info_button');

// ✅ Hiển thị với fade in
krpano.element.show('hotspot', 'menu', { 
  time: 1.0, 
  tween: 'easeOutSine' 
});

// ✅ Hiển thị layer với slide effect
krpano.element.show('layer', 'sidebar', { 
  time: 0.8, 
  tween: 'easeOutBack' 
});

// ✅ Hiển thị theo sequence
const showSequence = (elements: string[]) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      krpano.element.show('hotspot', element, { time: 0.5 });
    }, index * 200);
  });
};

showSequence(['btn1', 'btn2', 'btn3', 'btn4']);

// ✅ Conditional show
const showIfCondition = (elementName: string, condition: boolean) => {
  if (condition) {
    krpano.element.show('hotspot', elementName);
  }
};
```

### 2. hide() - Ẩn element
**Mục đích**: Ẩn hotspot/layer/plugin với animation

```tsx
// ✅ Ẩn ngay lập tức
krpano.element.hide('hotspot', 'temp_marker');

// ✅ Ẩn với fade out
krpano.element.hide('layer', 'overlay', { 
  time: 0.8, 
  tween: 'easeInSine' 
});

// ✅ Ẩn tất cả hotspots
const hideAllHotspots = (hotspotNames: string[]) => {
  hotspotNames.forEach(name => {
    krpano.element.hide('hotspot', name, { time: 0.3 });
  });
};

// ✅ Auto-hide sau thời gian
const autoHide = (elementName: string, delay: number) => {
  setTimeout(() => {
    krpano.element.hide('layer', elementName, { time: 0.5 });
  }, delay);
};
```

### 3. toggle() - Chuyển đổi hiển thị
**Mục đích**: Bật/tắt hiển thị element

```tsx
// ✅ Toggle cơ bản
krpano.element.toggle('layer', 'menu');

// ✅ Toggle với tracking state
let menuVisible = false;
const toggleMenu = () => {
  krpano.element.toggle('layer', 'navigation');
  menuVisible = !menuVisible;
  console.log('Menu is now:', menuVisible ? 'visible' : 'hidden');
};

// ✅ Toggle group
const toggleGroup = (groupName: string) => {
  const elements = [`${groupName}_1`, `${groupName}_2`, `${groupName}_3`];
  elements.forEach(element => {
    krpano.element.toggle('hotspot', element);
  });
};
```

### 4. animate() - Tạo animation tùy chỉnh
**Mục đích**: Tạo các hiệu ứng animation phức tạp

```tsx
// ✅ Animation đơn giản
krpano.element.animate('layer', 'popup', {
  x: 100,
  y: 200,
  alpha: 1.0
}, { time: 1.0, tween: 'easeOutBounce' });

// ✅ Animation phức tạp với nhiều thuộc tính
krpano.element.animate('hotspot', 'logo', {
  scale: 1.2,
  rotate: 360,
  alpha: 0.8,
  x: 50,
  y: -30
}, { 
  time: 2.0, 
  tween: 'easeInOutElastic',
  onComplete: 'trace(Animation completed!)'
});

// ✅ Pulse animation
const pulseAnimation = (elementName: string) => {
  krpano.element.animate('hotspot', elementName, {
    scale: 1.3,
    alpha: 0.7
  }, { time: 0.5, tween: 'easeOutSine' });
  
  setTimeout(() => {
    krpano.element.animate('hotspot', elementName, {
      scale: 1.0,
      alpha: 1.0
    }, { time: 0.5, tween: 'easeInSine' });
  }, 500);
};

// ✅ Floating animation
const floatingAnimation = (elementName: string) => {
  const float = () => {
    krpano.element.animate('hotspot', elementName, {
      y: krpano.utility.get(`hotspot[${elementName}].y`) - 10
    }, { time: 2.0, tween: 'easeInOutSine' });
    
    setTimeout(() => {
      krpano.element.animate('hotspot', elementName, {
        y: krpano.utility.get(`hotspot[${elementName}].y`) + 10
      }, { time: 2.0, tween: 'easeInOutSine' });
      setTimeout(float, 4000);
    }, 2000);
  };
  float();
};

// ✅ Shake animation
const shakeElement = (elementName: string) => {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      krpano.element.animate('hotspot', elementName, {
        x: krpano.utility.get(`hotspot[${elementName}].x`) + (i % 2 === 0 ? 5 : -5)
      }, { time: 0.1 });
    }, i * 100);
  }
};
```

### 5. addElement() - Thêm element mới
**Mục đích**: Tạo hotspot/layer/plugin động

```tsx
// ✅ Thêm hotspot cơ bản
krpano.element.addElement('hotspot', 'new_marker', {
  url: 'images/marker.png',
  ath: 90,
  atv: 0,
  scale: 1.0,
  visible: true
});

// ✅ Thêm layer thông tin
krpano.element.addElement('layer', 'info_panel', {
  url: 'images/panel.png',
  x: 100,
  y: 100,
  width: 300,
  height: 200,
  alpha: 0.9,
  visible: true
});

// ✅ Thêm hotspot với sự kiện
krpano.element.addElement('hotspot', 'interactive_btn', {
  url: 'images/button.png',
  ath: 45,
  atv: 10,
  onclick: 'loadscene(next_room)'
});

// ✅ Tạo hotspot grid
const createHotspotGrid = (rows: number, cols: number) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      krpano.element.addElement('hotspot', `grid_${i}_${j}`, {
        url: 'images/grid_point.png',
        ath: (360 / cols) * j,
        atv: ((180 / rows) * i) - 90,
        scale: 0.5,
        alpha: 0.7
      });
    }
  }
};
```

### 6. removeElement() - Xóa element
**Mục đích**: Xóa hotspot/layer/plugin không cần thiết

```tsx
// ✅ Xóa element đơn lẻ
krpano.element.removeElement('hotspot', 'temp_marker');

// ✅ Xóa nhiều elements
const removeElements = (elementNames: string[]) => {
  elementNames.forEach(name => {
    krpano.element.removeElement('hotspot', name);
  });
};

// ✅ Dọn dẹp elements với prefix
const cleanupElementsWithPrefix = (prefix: string) => {
  // Note: Trong thực tế cần get danh sách elements trước
  const elements = ['temp_1', 'temp_2', 'temp_3']; // Mock data
  elements.filter(name => name.startsWith(prefix))
          .forEach(name => {
            krpano.element.removeElement('hotspot', name);
          });
};
```

### 7. cloneElement() - Sao chép element
**Mục đích**: Tạo bản sao của element để tùy chỉnh

```tsx
// ✅ Sao chép hotspot
krpano.element.cloneElement('hotspot', 'original_marker', 'cloned_marker');

// ✅ Tạo nhiều bản sao
const createClones = (originalName: string, count: number) => {
  for (let i = 1; i <= count; i++) {
    krpano.element.cloneElement('hotspot', originalName, `${originalName}_copy_${i}`);
  }
};

// ✅ Clone và modify
const cloneAndModify = (original: string, newName: string, modifications: any) => {
  krpano.element.cloneElement('hotspot', original, newName);
  Object.entries(modifications).forEach(([key, value]) => {
    krpano.utility.set(`hotspot[${newName}].${key}`, value);
  });
};
```

---

## Sound Operations

### 1. playSound() - Phát âm thanh
**Mục đích**: Phát các hiệu ứng âm thanh và nhạc nền

```tsx
// ✅ Phát âm thanh cơ bản
krpano.sound.playSound('click_sound', 'audio/click.mp3');

// ✅ Phát nhạc nền với loop
krpano.sound.playSound('background_music', 'audio/ambient.mp3', {
  volume: 0.3,
  loops: -1 // Loop vô hạn
});

// ✅ Phát sound effect
krpano.sound.playSound('door_open', 'audio/door.wav', {
  volume: 0.8,
  loops: 1
});

// ✅ Phát âm thanh theo scene
const playSceneAmbient = (sceneName: string) => {
  const soundMap = {
    kitchen: 'audio/kitchen_ambient.mp3',
    garden: 'audio/birds.mp3',
    bedroom: 'audio/night_ambient.mp3'
  };
  
  if (soundMap[sceneName]) {
    krpano.sound.playSound('scene_ambient', soundMap[sceneName], {
      volume: 0.4,
      loops: -1
    });
  }
};

// ✅ Random sound effect
const playRandomSound = () => {
  const sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
  const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
  krpano.sound.playSound('random_sfx', `audio/${randomSound}`, { volume: 0.6 });
};
```

### 2. stopSound() - Dừng âm thanh
**Mục đích**: Dừng âm thanh đang phát

```tsx
// ✅ Dừng âm thanh cụ thể
krpano.sound.stopSound('background_music');

// ✅ Dừng âm thanh khi chuyển scene
const stopSceneSounds = () => {
  krpano.sound.stopSound('scene_ambient');
  krpano.sound.stopSound('scene_effects');
};

// ✅ Fade out trước khi stop
const fadeOutAndStop = (soundName: string) => {
  // Fade volume to 0 over 2 seconds, then stop
  krpano.utility.call(`tween(sound[${soundName}].volume, 0, 2.0, default, stopsound(${soundName}))`);
};
```

### 3. pauseSound() - Tạm dừng âm thanh
**Mục đích**: Tạm dừng âm thanh (có thể resume sau)

```tsx
// ✅ Pause/Resume music player
let musicPaused = false;
const toggleMusic = () => {
  if (musicPaused) {
    krpano.sound.playSound('background_music'); // Resume
  } else {
    krpano.sound.pauseSound('background_music');
  }
  musicPaused = !musicPaused;
};

// ✅ Pause khi user inactive
const handleUserInactivity = (inactive: boolean) => {
  if (inactive) {
    krpano.sound.pauseSound('scene_ambient');
  } else {
    krpano.sound.playSound('scene_ambient');
  }
};
```

### 4. setSoundVolume() - Điều chỉnh âm lượng
**Mục đích**: Thay đổi âm lượng của âm thanh đang phát

```tsx
// ✅ Điều chỉnh âm lượng cơ bản
krpano.sound.setSoundVolume('background_music', 0.5);

// ✅ Fade volume effect
const fadeVolume = (soundName: string, from: number, to: number, duration: number) => {
  krpano.utility.call(`tween(sound[${soundName}].volume, ${to}, ${duration})`);
};

// ✅ Volume slider
const handleVolumeSlider = (soundName: string, sliderValue: number) => {
  const volume = sliderValue / 100; // Convert 0-100 to 0-1
  krpano.sound.setSoundVolume(soundName, volume);
};

// ✅ Distance-based volume (3D audio effect)
const updateSoundByDistance = (soundName: string, distance: number) => {
  const maxDistance = 100;
  const volume = Math.max(0, 1 - (distance / maxDistance));
  krpano.sound.setSoundVolume(soundName, volume);
};
```

### 5. stopAllSounds() - Dừng tất cả âm thanh
**Mục đích**: Dừng toàn bộ âm thanh trong scene

```tsx
// ✅ Emergency stop all sounds
krpano.sound.stopAllSounds();

// ✅ Mute toggle
let soundsMuted = false;
const toggleMute = () => {
  if (soundsMuted) {
    // Unmute - restart sounds
    krpano.sound.playSound('background_music', null, { volume: 0.3, loops: -1 });
  } else {
    krpano.sound.stopAllSounds();
  }
  soundsMuted = !soundsMuted;
};

// ✅ Scene cleanup
const cleanupSceneSounds = () => {
  krpano.sound.stopAllSounds();
  console.log('All scene sounds stopped');
};
```

---

## Control Operations

### 1. enterFullscreen() / exitFullscreen() - Quản lý fullscreen
**Mục đích**: Điều khiển chế độ toàn màn hình

```tsx
// ✅ Enter fullscreen
krpano.control.enterFullscreen();

// ✅ Exit fullscreen
krpano.control.exitFullscreen();

// ✅ Toggle fullscreen
krpano.control.toggleFullscreen();

// ✅ Fullscreen with callback
const enterFullscreenMode = () => {
  krpano.control.enterFullscreen();
  console.log('Entered fullscreen mode');
};

// ✅ Conditional fullscreen
const conditionalFullscreen = (condition: boolean) => {
  if (condition) {
    krpano.control.enterFullscreen();
  } else {
    krpano.control.exitFullscreen();
  }
};
```

### 2. enableControl() / disableControl() - Điều khiển user control
**Mục đích**: Bật/tắt khả năng điều khiển của user

```tsx
// ✅ Enable user control
krpano.control.enableControl();

// ✅ Disable user control (for auto tour)
krpano.control.disableControl();

// ✅ Temporary disable during loading
const temporaryDisableControl = (duration: number) => {
  krpano.control.disableControl();
  setTimeout(() => {
    krpano.control.enableControl();
  }, duration);
};

// ✅ Conditional control based on user role
const setControlBasedOnRole = (userRole: 'admin' | 'viewer' | 'guest') => {
  if (userRole === 'admin') {
    krpano.control.enableControl();
  } else if (userRole === 'viewer') {
    krpano.control.enableControl();
  } else {
    krpano.control.disableControl(); // Guests can only watch
  }
};
```

### 3. setCursor() - Thay đổi cursor
**Mục đích**: Thay đổi hình dạng con trỏ chuột

```tsx
// ✅ Set different cursor types
krpano.control.setCursor('normal');
krpano.control.setCursor('drag');
krpano.control.setCursor('dragging');
krpano.control.setCursor('moving');

// ✅ Interactive cursor feedback
const setCursorOnHover = (isHovering: boolean) => {
  if (isHovering) {
    krpano.control.setCursor('drag');
  } else {
    krpano.control.setCursor('normal');
  }
};

// ✅ Context-based cursor
const setContextCursor = (mode: 'view' | 'edit' | 'measure') => {
  switch(mode) {
    case 'view':
      krpano.control.setCursor('normal');
      break;
    case 'edit':
      krpano.control.setCursor('drag');
      break;
    case 'measure':
      // Custom cursor for measuring tool
      krpano.control.setCursor('normal');
      break;
  }
};
```

### 4. showWaitcursor() / hideWaitcursor() - Loading cursor
**Mục đích**: Hiển thị cursor loading khi xử lý

```tsx
// ✅ Show loading cursor
krpano.control.showWaitcursor();

// ✅ Hide loading cursor
krpano.control.hideWaitcursor();

// ✅ Show during async operations
const performAsyncOperation = async () => {
  krpano.control.showWaitcursor();
  
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Operation completed');
  } finally {
    krpano.control.hideWaitcursor();
  }
};

// ✅ Auto-hide after timeout
const showWaitWithTimeout = (timeout: number = 5000) => {
  krpano.control.showWaitcursor();
  setTimeout(() => {
    krpano.control.hideWaitcursor();
  }, timeout);
};
```

---

## Utility Operations

### 1. loadXML() - Load file XML
**Mục đích**: Tải cấu hình XML mới

```tsx
// ✅ Load new XML configuration
krpano.utility.loadXML('/config/new_tour.xml');

// ✅ Load XML with keep display
krpano.utility.loadXML('/config/addon.xml', { keepdisplay: true });

// ✅ Load XML based on user selection
const loadTourConfiguration = (tourType: 'basic' | 'premium' | 'vip') => {
  const xmlPaths = {
    basic: '/config/basic_tour.xml',
    premium: '/config/premium_tour.xml',
    vip: '/config/vip_tour.xml'
  };
  
  krpano.utility.loadXML(xmlPaths[tourType]);
};

// ✅ Dynamic XML loading
const loadDynamicConfig = (userId: string) => {
  krpano.utility.loadXML(`/config/user_${userId}.xml`);
};
```

### 2. reload() - Reload tour
**Mục đích**: Tải lại toàn bộ tour

```tsx
// ✅ Simple reload
krpano.utility.reload();

// ✅ Reload with confirmation
const reloadWithConfirmation = () => {
  if (confirm('Bạn có muốn tải lại tour?')) {
    krpano.utility.reload();
  }
};

// ✅ Auto-reload on error
const autoReloadOnError = () => {
  // Simulate error detection
  setTimeout(() => {
    console.log('Error detected, reloading...');
    krpano.utility.reload();
  }, 5000);
};

// ✅ Reload with save state
const reloadWithState = () => {
  // Save current state
  const currentState = {
    scene: krpano.utility.get('xml.scene'),
    hlookat: krpano.utility.get('view.hlookat'),
    vlookat: krpano.utility.get('view.vlookat'),
    fov: krpano.utility.get('view.fov')
  };
  
  localStorage.setItem('tourState', JSON.stringify(currentState));
  krpano.utility.reload();
};
```

### 3. screenshot() - Chụp màn hình
**Mục đích**: Tạo ảnh chụp màn hình tour

```tsx
// ✅ Basic screenshot
krpano.utility.screenshot();

// ✅ High resolution screenshot
krpano.utility.screenshot({ scale: 2.0, alpha: false });

// ✅ Screenshot with transparency
krpano.utility.screenshot({ scale: 1.0, alpha: true });

// ✅ Screenshot for thumbnail generation
const generateThumbnail = () => {
  krpano.utility.screenshot({ scale: 0.5, alpha: false });
  console.log('Thumbnail generated');
};

// ✅ Batch screenshot for all scenes
const screenshotAllScenes = (sceneNames: string[]) => {
  sceneNames.forEach((sceneName, index) => {
    setTimeout(() => {
      krpano.scene.loadScene(sceneName);
      setTimeout(() => {
        krpano.utility.screenshot({ scale: 1.0 });
        console.log(`Screenshot taken for ${sceneName}`);
      }, 1000);
    }, index * 2000);
  });
};
```

### 4. trace() - Debug logging
**Mục đích**: Ghi log debug thông tin

```tsx
// ✅ Simple trace
krpano.utility.trace('Debug message');

// ✅ Trace with variables
const debugCurrentState = () => {
  const currentScene = krpano.utility.get('xml.scene');
  const currentFov = krpano.utility.get('view.fov');
  krpano.utility.trace(`Current scene: ${currentScene}, FOV: ${currentFov}`);
};

// ✅ Conditional tracing
const conditionalTrace = (condition: boolean, message: string) => {
  if (condition) {
    krpano.utility.trace(`DEBUG: ${message}`);
  }
};

// ✅ Performance tracing
const tracePerformance = (operationName: string, startTime: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  krpano.utility.trace(`${operationName} took ${duration.toFixed(2)}ms`);
};
```

### 5. error() - Error logging
**Mục đích**: Ghi log lỗi

```tsx
// ✅ Simple error logging
krpano.utility.error('Something went wrong!');

// ✅ Error with context
const logErrorWithContext = (error: Error, context: string) => {
  krpano.utility.error(`${context}: ${error.message}`);
};

// ✅ Try-catch with error logging
const safeOperation = () => {
  try {
    // Risky operation
    throw new Error('Test error');
  } catch (error) {
    krpano.utility.error(`Operation failed: ${error.message}`);
  }
};
```

### 6. get() / set() - Đọc/ghi biến
**Mục đích**: Truy cập và thay đổi thuộc tính Krpano

```tsx
// ✅ Get values
const currentScene = krpano.utility.get('xml.scene');
const viewFov = krpano.utility.get('view.fov');
const hotspotVisible = krpano.utility.get('hotspot[info].visible');

// ✅ Set values
krpano.utility.set('view.fov', 90);
krpano.utility.set('hotspot[marker].alpha', 0.8);
krpano.utility.set('layer[menu].visible', true);

// ✅ Dynamic property access
const getHotspotProperty = (hotspotName: string, property: string) => {
  return krpano.utility.get(`hotspot[${hotspotName}].${property}`);
};

const setHotspotProperty = (hotspotName: string, property: string, value: any) => {
  krpano.utility.set(`hotspot[${hotspotName}].${property}`, value);
};

// ✅ Batch operations
const setMultipleProperties = (properties: Record<string, any>) => {
  Object.entries(properties).forEach(([path, value]) => {
    krpano.utility.set(path, value);
  });
};

// Example usage:
setMultipleProperties({
  'view.fov': 80,
  'hotspot[info].alpha': 0.9,
  'layer[menu].x': 100,
  'layer[menu].y': 50
});
```

### 7. call() - Thực thi lệnh
**Mục đích**: Thực thi lệnh Krpano trực tiếp

```tsx
// ✅ Simple call
krpano.utility.call('trace(Hello World)');

// ✅ Complex operations
krpano.utility.call('tween(view.fov, 60, 2.0, easeInOutSine)');

// ✅ Multiple commands
const executeMultipleCommands = () => {
  krpano.utility.call(`
    set(hotspot[marker].visible, true);
    tween(hotspot[marker].alpha, 1.0, 1.0);
    playsound(notification);
  `);
};

// ✅ Conditional execution
const conditionalCall = (condition: boolean) => {
  if (condition) {
    krpano.utility.call('loadscene(next_room)');
  } else {
    krpano.utility.call('trace(Condition not met)');
  }
};
```

### 8. callwith() - Thực thi với tham số
**Mục đích**: Thực thi lệnh với nhiều tham số

```tsx
// ✅ Call with parameters
krpano.utility.callwith('loadscene', 'bedroom', 'null', 'BLEND(1.0)');

// ✅ Dynamic parameters
const callWithDynamicParams = (action: string, ...params: any[]) => {
  krpano.utility.callwith(action, ...params);
};

// Example:
callWithDynamicParams('tween', 'view.fov', 90, 2.0, 'easeOutSine');
```

### 9. wait() - Delay execution
**Mục đích**: Trì hoãn thực thi lệnh

```tsx
// ✅ Simple wait
krpano.utility.wait(2.0); // Wait 2 seconds

// ✅ Wait with callback
krpano.utility.wait(1.5, 'trace(Timer finished)');

// ✅ Sequential operations with delays
const sequentialOperations = () => {
  krpano.utility.call('trace(Step 1)');
  krpano.utility.wait(1.0, 'trace(Step 2)');
  krpano.utility.wait(2.0, 'loadscene(next_room)');
  krpano.utility.wait(3.0, 'trace(Sequence completed)');
};

// ✅ Timed auto-tour
const startTimedAutoTour = (scenes: string[], interval: number) => {
  scenes.forEach((scene, index) => {
    krpano.utility.wait(interval * index, `loadscene(${scene})`);
  });
};
```

---

## Base Execute Function

### Sử dụng hàm execute cơ bản
**Mục đích**: Thực thi lệnh với type safety

```tsx
const krpano = useKrpanoCommand();

// ✅ Set hotspot properties
krpano.execute({
  type: 'hotspot',
  name: 'info_button',
  options: {
    visible: true,
    alpha: 0.9,
    scale: 1.2,
    handcursor: true
  }
});

// ✅ Set layer properties
krpano.execute({
  type: 'layer',
  name: 'overlay',
  options: {
    x: 100,
    y: 200,
    width: 300,
    height: 150,
    alpha: 0.8,
    visible: true
  }
});

// ✅ Set view properties
krpano.execute({
  type: 'view',
  options: {
    hlookat: 90,
    vlookat: 10,
    fov: 80,
    fovmin: 30,
    fovmax: 150
  }
});

// ✅ Raw command execution
krpano.execute({
  raw: 'tween(view.fov, 60, 2.0, easeInOutSine, trace(Zoom completed))'
});

// ✅ Plugin configuration
krpano.execute({
  type: 'plugin',
  name: 'webvr',
  options: {
    enabled: true,
    keeptexture: true,
    showstereosupport: false
  }
});

// ✅ Sound configuration
krpano.execute({
  type: 'sound',
  name: 'ambient',
  options: {
    url: 'audio/forest.mp3',
    volume: 0.6,
    loops: -1
  }
});

// ✅ Events setup
krpano.execute({
  type: 'events',
  options: {
    onloadcomplete: 'trace(Tour loaded successfully)',
    onresize: 'trace(Window resized)',
    onclick: 'trace(User clicked)'
  }
});

// ✅ Display settings
krpano.execute({
  type: 'display',
  options: {
    width: '100%',
    height: '100%',
    align: 'center',
    background: '#000000'
  }
});
```

---

## Shortcuts

### Sử dụng các shortcuts tiện lợi

```tsx
const krpano = useKrpanoCommand();

// ✅ Quick show/hide (default to hotspot)
krpano.show('info_marker');
krpano.hide('temp_marker');
krpano.toggle('menu_button');

// ✅ Specify element type
krpano.show('sidebar', 'layer');
krpano.hide('overlay', 'layer');
krpano.toggle('audio_player', 'plugin');

// ✅ Quick scene loading
krpano.loadScene('kitchen');

// ✅ Quick camera control
krpano.lookAt(180, 0, 90);
krpano.zoomTo(60);

// ✅ Combined shortcuts
const quickTour = () => {
  krpano.show('loading', 'layer');
  krpano.loadScene('bedroom');
  krpano.lookAt(90, 10, 80);
  krpano.hide('loading', 'layer');
};
```

---

## Kết hợp nhiều thao tác

### 1. Tour tự động hoàn chỉnh

```tsx
const createAutoTour = () => {
  const scenes = [
    { name: 'entrance', lookAt: [0, 0, 90], duration: 3000 },
    { name: 'living_room', lookAt: [90, -5, 85], duration: 4000 },
    { name: 'kitchen', lookAt: [180, 0, 95], duration: 3500 },
    { name: 'bedroom', lookAt: [270, 10, 75], duration: 4000 }
  ];

  let currentIndex = 0;

  const nextScene = () => {
    if (currentIndex < scenes.length) {
      const scene = scenes[currentIndex];
      
      // Show loading
      krpano.element.show('layer', 'loading', { time: 0.3 });
      
      // Load scene
      krpano.scene.loadScene(scene.name, { blend: 'BLEND(1.5)' });
      
      // Set camera position
      krpano.view.lookAt(scene.lookAt[0], scene.lookAt[1], scene.lookAt[2], {
        smooth: true,
        time: 2.0,
        tween: 'easeInOutSine'
      });
      
      // Hide loading
      setTimeout(() => {
        krpano.element.hide('layer', 'loading', { time: 0.3 });
      }, 1500);
      
      // Play scene sound
      krpano.sound.playSound('scene_ambient', `audio/${scene.name}.mp3`, {
        volume: 0.4,
        loops: 1
      });
      
      currentIndex++;
      
      // Schedule next scene
      if (currentIndex < scenes.length) {
        setTimeout(nextScene, scene.duration);
      } else {
        // Tour completed
        krpano.element.show('layer', 'tour_complete', { time: 1.0 });
        krpano.sound.playSound('completion', 'audio/complete.mp3');
      }
    }
  };

  nextScene();
};
```

### 2. Interactive hotspot system

```tsx
const createInteractiveHotspots = () => {
  const hotspots = [
    { 
      name: 'info_1', 
      position: [45, 10], 
      info: 'This is the living room area',
      image: 'images/info.png'
    },
    { 
      name: 'info_2', 
      position: [135, -5], 
      info: 'Kitchen with modern appliances',
      image: 'images/kitchen.png'
    },
    { 
      name: 'info_3', 
      position: [225, 15], 
      info: 'Comfortable bedroom space',
      image: 'images/bedroom.png'
    }
  ];

  hotspots.forEach((hotspot, index) => {
    // Create hotspot
    krpano.element.addElement('hotspot', hotspot.name, {
      url: 'images/hotspot_marker.png',
      ath: hotspot.position[0],
      atv: hotspot.position[1],
      scale: 0.8,
      alpha: 0.7,
      onclick: `showInfo(${hotspot.name})`
    });

    // Create info layer
    krpano.element.addElement('layer', `${hotspot.name}_info`, {
      url: hotspot.image,
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      alpha: 0,
      visible: false,
      zorder: 1000
    });

    // Pulse animation
    setTimeout(() => {
      krpano.element.animate('hotspot', hotspot.name, {
        scale: 1.0,
        alpha: 1.0
      }, { 
        time: 0.5, 
        tween: 'easeOutBounce' 
      });
    }, index * 500);
  });

  // Global function for showing info
  (window as any).showInfo = (hotspotName: string) => {
    // Hide all info panels
    hotspots.forEach(h => {
      krpano.element.hide('layer', `${h.name}_info`, { time: 0.3 });
    });

    // Show selected info
    krpano.element.show('layer', `${hotspotName}_info`, { time: 0.5 });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      krpano.element.hide('layer', `${hotspotName}_info`, { time: 0.5 });
    }, 5000);
  };
};
```

### 3. Adaptive quality system

```tsx
const createAdaptiveQuality = () => {
  const checkPerformance = () => {
    // Simulate performance check
    const fps = 60; // Mock FPS
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    let quality: 'low' | 'medium' | 'high' = 'medium';

    if (isMobile || fps < 30) {
      quality = 'low';
    } else if (fps > 50 && devicePixelRatio > 1) {
      quality = 'high';
    }

    return quality;
  };

  const applyQualitySettings = (quality: 'low' | 'medium' | 'high') => {
    const settings = {
      low: {
        details: 8,
        tessellation: 0.5,
        renderinterface: false
      },
      medium: {
        details: 12,
        tessellation: 1.0,
        renderinterface: true
      },
      high: {
        details: 16,
        tessellation: 1.5,
        renderinterface: true
      }
    };

    const config = settings[quality];
    
    krpano.execute({
      type: 'display',
      options: {
        details: config.details,
        tessellation: config.tessellation,
        renderinterface: config.renderinterface
      }
    });

    krpano.utility.trace(`Applied ${quality} quality settings`);
  };

  const currentQuality = checkPerformance();
  applyQualitySettings(currentQuality);
};
```

### 4. User preference system

```tsx
const createUserPreferenceSystem = () => {
  const defaultPreferences = {
    autoRotate: false,
    soundEnabled: true,
    soundVolume: 0.7,
    showHelp: true,
    quality: 'medium' as 'low' | 'medium' | 'high',
    controlSensitivity: 1.0
  };

  const loadPreferences = () => {
    const saved = localStorage.getItem('krpano_preferences');
    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  };

  const savePreferences = (preferences: typeof defaultPreferences) => {
    localStorage.setItem('krpano_preferences', JSON.stringify(preferences));
  };

  const applyPreferences = (preferences: typeof defaultPreferences) => {
    // Apply sound settings
    if (preferences.soundEnabled) {
      krpano.sound.playSound('ambient', 'audio/ambient.mp3', {
        volume: preferences.soundVolume,
        loops: -1
      });
    } else {
      krpano.sound.stopAllSounds();
    }

    // Apply control sensitivity
    krpano.execute({
      type: 'control',
      options: {
        mousetype: preferences.controlSensitivity > 1 ? 'drag' : 'moveto',
        dragspeed: preferences.controlSensitivity
      }
    });

    // Apply auto-rotate
    if (preferences.autoRotate) {
      startAutoRotate();
    }

    // Show/hide help
    krpano.execute({
      type: 'layer',
      name: 'help',
      options: {
        visible: preferences.showHelp
      }
    });
  };

  const startAutoRotate = () => {
    const rotate = () => {
      const currentH = krpano.utility.get('view.hlookat');
      krpano.view.lookAt((currentH + 1) % 360, 0, undefined, {
        smooth: true,
        time: 0.1
      });
      setTimeout(rotate, 100);
    };
    rotate();
  };

  const preferences = loadPreferences();
  applyPreferences(preferences);

  return {
    updatePreference: (key: keyof typeof defaultPreferences, value: any) => {
      const updated = { ...preferences, [key]: value };
      savePreferences(updated);
      applyPreferences(updated);
    },
    getPreferences: () => preferences
  };
};
```

### 5. Analytics tracking system

```tsx
const createAnalyticsSystem = () => {
  const trackEvent = (eventName: string, data?: any) => {
    // Send to analytics service
    console.log('Analytics:', eventName, data);
    
    // Could integrate with Google Analytics, etc.
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, data);
    }
  };

  const trackSceneVisit = (sceneName: string) => {
    trackEvent('scene_visit', {
      scene_name: sceneName,
      timestamp: new Date().toISOString(),
      duration: 0 // Will be updated when leaving scene
    });
  };

  const trackHotspotClick = (hotspotName: string) => {
    trackEvent('hotspot_click', {
      hotspot_name: hotspotName,
      scene: krpano.utility.get('xml.scene'),
      timestamp: new Date().toISOString()
    });
  };

  const trackViewChange = () => {
    const viewData = {
      hlookat: krpano.utility.get('view.hlookat'),
      vlookat: krpano.utility.get('view.vlookat'),
      fov: krpano.utility.get('view.fov')
    };
    
    trackEvent('view_change', viewData);
  };

  // Setup automatic tracking
  const setupAutoTracking = () => {
    // Track scene changes
    krpano.execute({
      type: 'events',
      options: {
        onnewscene: 'trackSceneVisit(get(xml.scene))',
        onviewchange: 'trackViewChange()'
      }
    });
  };

  setupAutoTracking();

  return {
    trackEvent,
    trackSceneVisit,
    trackHotspotClick,
    trackViewChange
  };
};
```

---

## 🎯 Tóm tắt các trường hợp sử dụng chính:

1. **Scene Management**: Chuyển cảnh, quản lý tour đa phòng
2. **Camera Control**: Điều khiển góc nhìn, tạo auto-tour
3. **Interactive Elements**: Hotspot tương tác, menu, popup
4. **Audio Experience**: Nhạc nền, sound effects theo context
5. **User Experience**: Fullscreen, loading states, preferences  
6. **Performance**: Adaptive quality, optimization
7. **Analytics**: Tracking user behavior
8. **Accessibility**: Control options, user preferences

Mỗi ví dụ đều có thể customize và kết hợp với nhau để tạo nên trải nghiệm 360° tour hoàn chỉnh và phong phú!