import { tempimage, mill, lathe, bandsaw_soft, bandsaw_steel, drill_press_soft, drill_press_steel, vertical_mill, horizontal_bandsaw, cut_off_soft, cut_off_steel, belt_sander, spindle_sander, bandsaw_small, bandsaw_big, drill_press, table_saw, waterjet, blade_runner, grinder1, grinder2, grinder3 } from '../images';

export const machine_images = {
    "CNC Mill":mill,
    "Bandsaw M1":bandsaw_soft,
    "Bandsaw M2":bandsaw_steel,
    "Bandsaw (Big)":bandsaw_big,
    "Bandsaw (Small)":bandsaw_small,
    "Drill Press M1":drill_press_soft,
    "Drill Press M2":drill_press_steel,
    "Drill Press":drill_press,
    "Lathe":lathe,
    "Grinder 1":grinder1,
    "Grinder 2":grinder2,
    "Grinder 3":grinder3,
    "Belt Sander":belt_sander,
    "Vertical Mill":vertical_mill,
    "Horizontal Bandsaw":horizontal_bandsaw,
    "Cut Off M1":cut_off_soft,
    "Cut Off M2":cut_off_steel,
    "Spindle Sander":spindle_sander,
    "Waterjet":waterjet,
    "Table Saw":table_saw,
    "Blade Runner":blade_runner,
    }
export default function getImage(machineName) {
    console.log("NAME: " + machineName);
    console.log("IMAGE:" + machine_images[machineName]);
    if (machine_images[machineName])
        return machine_images[machineName];
    return tempimage;
}