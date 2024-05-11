class StudyData {
    constructor({
        id,
        dangerType,
        workingDistance,
        incidentEnergy,
        arcFlashBoundary,
        shockHazard,
        limitedApproach,
        restrictedApproach,
        gloveClass,
        gloveVrating,
        equipment,
        analysisBy,
        date,
        standard,
        file,
    }) {
        this.id = id;
        this.dangerType = dangerType;
        this.workingDistance = workingDistance;
        this.incidentEnergy = incidentEnergy;
        this.arcFlashBoundary = arcFlashBoundary;
        this.shockHazard = shockHazard;
        this.limitedApproach = limitedApproach;
        this.restrictedApproach = restrictedApproach;
        this.gloveClass = gloveClass;
        this.equipment = equipment;
        this.date = date;
        this.standard = standard;
        this.file = file;
    }
}

module.exports = StudyData;
