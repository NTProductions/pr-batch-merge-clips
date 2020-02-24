var project = app.project;
var projectItem = project.rootItem;

main();


function main() {
var mergeArray = [];
var tempName, thisName, audioCheck, thisSequence, audioTracks, audioTrackOne, videoTracks, videoTrackOne;
// each index has [vidFootage.name][audioFootage.name]
// if audioFootage.name != null, the script found a matching audio track for the video
// matching is going to be based on the file name, not the name displayed in the Project Panel. This is because you can easily change the name of a Pr item, and it will become seemingly impossible to detect if it's a video or audio item
for(var i = 0; i < projectItem.children.numItems; i++) {
    tempName = projectItem.children[i].getMediaPath();
    thisName = tempName.slice(tempName.lastIndexOf("\\")+1, tempName.length);
    if(isVideoName(thisName)) {
        mergeArray.push([projectItem.children[i], null]);
        audioCheck = checkForAudioCounterpart(projectItem.children[i], thisName);
        if(audioCheck) {
        mergeArray[mergeArray.length-1][1] = audioCheck;
        thisSequence = project.createNewSequence(thisName, "test");
        videoTracks = thisSequence.videoTracks;
        audioTracks = thisSequence.audioTracks;
        videoTrackOne = videoTracks[0];
        audioTrackOne = audioTracks[2];
        videoTrackOne.insertClip(mergeArray[mergeArray.length-1][0], 0);
        audioTrackOne.insertClip(mergeArray[mergeArray.length-1][1], 0);
            } else {
        mergeArray[mergeArray.length-1][1] = null;
                }
        }
        }
}
    
function isVideoName(name) {
    var extensions = [".mp4", ".m4a", ".m4v", ".f4v", ".f4a", ".m4b", ".mov", ".f4b", ".3gp", ".ogg", ".wmv", ".asf", ".webm", ".flv", ".avi", ".hdv", ".mxf", ".mpg", ".mpeg", ".mpeg2", ".vob", ".mp5"];
    for(var i = 0; i < extensions.length; i++) {
        if(name.indexOf(extensions[i]) != -1) {
            return true;
            }
        }
        return false;
    }

function isAudioName(name) {
    var extensions = [".mp3", ".ogg", ".m4a", ".f4a", ".wma", ".wav", ".mxf"];
    for(var i = 0; i < extensions.length; i++) {
        if(name.indexOf(extensions[i]) != -1) {
            return true;
            }
        }
        return false;
    }

function checkForAudioCounterpart(videoItem, name) {
    var cutName = videoItem.name.slice(0, videoItem.name.length-4);
    var tempName, thisName;
    for(var i = 0; i < projectItem.children.numItems; i++) {
        tempName = projectItem.children[i].getMediaPath();
        thisName = tempName.slice(tempName.lastIndexOf("\\")+1, tempName.length);
        if(thisName.indexOf(cutName) != -1 && isAudioName(thisName)) {
                return projectItem.children[i];
            }
        }
    return null;
    }