import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// FINAL, CORRECTED DATA. Thursday schedule is now fixed.
const timetableGrid = {
    monday:    ['A', 'B', 'C', 'D', 'FML', 'DAL', 'J/J3', '-'],
    tuesday:   ['B', 'C', 'D', 'E', 'MFDS', 'Q', 'DSDS', '-'],
    wednesday: ['C', 'D', 'E', 'DSDS', 'B', 'DSL', 'FML', 'GN5003'],
    thursday:  ['E', 'DSDS', 'FML', 'MFDS', 'D', 'S', 'H/H3', '-'], // Final correct schedule
    friday:    ['DSDS', 'FML', 'MFDS', 'B', 'C', 'T', 'E', '-'],
};

// Class definitions with FULL names, no abbreviations.
const classDefinitions = {
    'DSDS': { name: 'Data Structures for Data Science', code: 'DA5300', abbr: 'DSDS', details: 'Slot F | NAC633', color: '#fde047' },
    'FML': { name: 'Foundation of Machine Learning', code: 'DA5400', abbr: 'FML', details: 'Slot G | CRC101', color: '#a78bfa' },
    'MFDS': { name: 'Mathematical Foundations of Data Science', code: 'DA5000', abbr: 'MFDS', details: 'Slot A | NAC633', color: '#06b6d4' },
    'DAL': { name: 'Data Analytics Laboratory', code: 'DA5401', abbr: 'DAL', details: 'Slot P | CRC101', color: '#4ade80' },
    'DSL': { name: 'Data Structure Lab', code: 'DA5300', abbr: 'DSL', details: 'Slot R | NAC632', color: '#f472b6' },
    'GN5003': { name: 'GN 5003', code: 'GN5003', abbr: '', details: 'Terrace @ FFT', color: '#fdba74' },
};

const Timetable = () => {
    const [removed, setRemoved] = useState({});
    const [isAbbreviated, setIsAbbreviated] = useState(false);
    const timetableRef = useRef(null);

    const handleCellClick = (day, index, slot) => {
        if (!classDefinitions[slot]) return;
        const key = `${day}-${index}`;
        setRemoved(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetTimetable = () => setRemoved({});

    const downloadTimetable = (downloadType) => {
        if (timetableRef.current) {
            html2canvas(timetableRef.current, {
                backgroundColor: '#ffffff',
                scale: 3,
                onclone: (doc) => {
                    if (downloadType === 'clean') {
                        Object.keys(removed).forEach(key => {
                            if (removed[key]) {
                                const cell = doc.querySelector(`[data-key='${key}']`);
                                if (cell) {
                                    const slotLetter = cell.getAttribute('data-slot-letter');
                                    cell.className = 'class-cell empty-slot';
                                    cell.style.backgroundColor = 'white';
                                    cell.innerHTML = `<div class="class-name" style="color: #c0c0c0;">${slotLetter}</div>`;
                                }
                            }
                        });
                    }
                    // For 'ui' download, no changes are needed, it clones the current view
                }
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = `timetable-whatsapp-${downloadType}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    const renderCell = (day, slot, index) => {
        const key = `${day}-${index}`;
        const classDef = classDefinitions[slot];
        const isRemoved = removed[key];

        if (!classDef) {
            return (
                <div key={key} data-key={key} data-slot-letter={slot} className="class-cell empty-slot">
                    <div className="class-name">{slot === '-' ? '' : slot}</div>
                </div>
            );
        }

        const cellClass = isRemoved ? 'class-cell removed' : 'class-cell';
        return (
            <div 
                key={key} 
                data-key={key}
                data-slot-letter={slot}
                className={cellClass}
                style={{ backgroundColor: classDef.color, color: '#000' }}
                onClick={() => handleCellClick(day, index, slot)}
            >
                {isRemoved && <div className="cross-mark">&#x2715;</div>}
                <div className="class-name">{isAbbreviated ? `${classDef.code} ${classDef.abbr}` : classDef.name}</div>
                <div className="class-details">{classDef.details}</div>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="timetable-container" ref={timetableRef}>
                <div className="header"></div>
                <div className="header">Mon</div>
                <div className="header">Tue</div>
                <div className="header">Wed</div>
                <div className="header">Thu</div>
                <div className="header">Fri</div>

                <div className="time-slot">8:00<br/>8:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][0], 0))}
                
                <div className="time-slot">9:00<br/>9:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][1], 1))}

                <div className="time-slot">10:00<br/>10:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][2], 2))}

                <div className="time-slot">11:00<br/>11:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][3], 3))}

                <div className="time-slot">12:00<br/>12:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][4], 4))}

                <div className="time-slot lunch-time">12:50<br/>2:00</div>
                <div className="class-cell lunch-break" style={{ gridColumn: 'span 5' }}>Lunch</div>

                <div className="time-slot">2:00<br/>4:45</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][5], 5))}

                <div className="time-slot">5:00<br/>5:50</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][6], 6))}

                <div className="time-slot">6:00<br/>7:45</div>
                {Object.keys(timetableGrid).map(day => renderCell(day, timetableGrid[day][7], 7))}
            </div>
            <div className="controls">
                <div className="toggle-switch">
                    <label>
                        <input type="checkbox" checked={isAbbreviated} onChange={() => setIsAbbreviated(!isAbbreviated)} />
                        <span className="slider"></span>
                    </label>
                    <span>Abbreviate</span>
                </div>
                <button onClick={() => downloadTimetable('clean')} className="download-btn">Download Clean</button>
                <button onClick={() => downloadTimetable('ui')} className="download-btn-alt">Download UI View</button>
                <button onClick={resetTimetable} className="reset-btn">Reset to Default</button>
            </div>
        </div>
    );
};

export default Timetable;