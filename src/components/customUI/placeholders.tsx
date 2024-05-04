import React from 'react';

const PackageCardPlaceholder: React.FC = () => {
    return (
        <div className="card-placeholder">
            <div className="placeholder-image" />
            <div className="placeholder-text" />
        </div>
    );
};

const VehicleCardPlaceholder: React.FC = () => {
    return (
        <div className="card-placeholder">
            <div className="placeholder-image" />
            <div className="placeholder-text" />
        </div>
    );
};

export { PackageCardPlaceholder, VehicleCardPlaceholder };
