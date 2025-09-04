import React, { useState } from 'react';

const SettingsPanel = () => {
    const [audioVolume, setAudioVolume] = useState(50);
    const [visualComplexity, setVisualComplexity] = useState('Medium');
    const [inputSensitivity, setInputSensitivity] = useState(5);

    return (
        <div className="settings-panel">
            <h3>Settings</h3>
            <div>
                <label>Audio Volume: {audioVolume}</label>
                <input type="range" min="0" max="100" value={audioVolume} onChange={(e) => setAudioVolume(Number(e.target.value))} />
            </div>
            <div>
                <label>Visual Complexity: {visualComplexity}</label>
                <select value={visualComplexity} onChange={(e) => setVisualComplexity(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <label>Input Sensitivity: {inputSensitivity}</label>
                <input type="number" min="1" max="10" value={inputSensitivity} onChange={(e) => setInputSensitivity(Number(e.target.value))} />
            </div>
        </div>
    );
};

export default SettingsPanel; 