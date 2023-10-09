--[[

    Visual Screens ULTRA | Loader
    A all new way to elevate your visual experience.
    
    
    [Warning] This file is not accessible for the public eye. Any attempts to steal, 
    reproduce, or copy code directly below will result in proper moderation 
    procauations and immediate removal of all licensed products.


    | Developed by
    | iVastz

    | Published by Techo Incorporated
    | Lasted updated 9/23/23

]]--

-- Variables
local VSULoader = {}

    -- Objects
    local SettingsScript = script.Parent.Parent
    local ImportsFolder = script.Parent.Imports

    -- Strings
    local Version = 3.01

-- Functions

    -- Warnings
    local function sendError(msg) -- Sends a formatted error (if there is one)
        warn([[Visual Screens Ultra | ]]..Version..[[ 

        An error occured:
        ]]..msg..[[
        
        For error assistance, open a ticket in our server or watch the online tutorial.]])
    end

--[[
    
    1 | SPRITESHEET FUNCTIONS

]]-- 

    -- Spritesheet Functions
    local function calculateSpritesheetSize(ImageSize)
        
        local CalculatedX, CalculatedY = nil,nil
        
        if ImageSize.X > 1080 or ImageSize.Y > 1080 then -- Only downsize images if their size exceeds 1080px x 1080px
            if ImageSize.X > ImageSize.Y then -- If 'x' is greater than 'y,' then use simple algebra to downsize Y exactly
                CalculatedX = 1080
                CalculatedY = (1080/ImageSize.X) * ImageSize.Y
            elseif ImageSize.Y > ImageSize.X then -- If 'y' is greater than 'x,' then use the inverse of the simple algebric expression to downsize X instead
                CalculatedX = (1080/ImageSize.Y) * ImageSize.X
                CalculatedY = 1080
            else ImageSize.X == ImageSize.Y then -- If the sizes are the same, set them to 1080px x 1080px
                CalculatedX = 1080
                CalculatedY = 1080
            end
        else -- If the size does not exceed 1080px by 1080px, then ignore this process and return the original values
            CalculatedX = ImageSize.X
            CalculatedY = ImageSize.Y
        end
        
        return CalculatedX, CalculatedY -- Returns the exact size values
    end
        
    local function calculateSpriteFrameSize(ImageSize, Columns, Rows)
        
        -- Calculate Actual Image Size
        local ActualImageSize = calculateSpritesheetSize(ImageSize)
        
        -- Calculate Frame Size
        local FrameSizeX, FrameSizeY = 0,0
        FrameSizeX = ActualImageSize.X / Columns
        FrameSizeY = ActualImageSize.Y / Rows
        
        return FrameSizeX, FrameSizeY -- Returns the exact frame size values
    end


--[[
    
    2 | SETUP FUNCTIONS

]]-- 

    -- Extract Images & GIFs
    local function ExtractFiles()
        
        -- Variables
        local Images = {}
        local GIFs = {}
        
        local TotalImageCount = 0
        local TotalGifCount = 0
        
        local SetupErrors = {}

        -- Extract Images
        for index,value in pairs(ImportsFolder.Images:GetChildren()) do
           if value:IsA('BoolValue') and value:GetAttribute('ImageId') ~= nil then
               TotalImageCount = TotalImageCount + 1 -- Increase total image count
               
               Images[TotalImageCount] = { -- Make new table for image
                   ImageId = value:GetAttribute('ImageId'), -- Set image ID
                   Name = value:GetAttribute('Name') or 'Image '..TotalImageCount, -- Set image name, or make a name
                   ZIndex = value:GetAttribute('Order') or 0 -- Set iamge order, if any
               }
           end
        end

        -- Extract GIFs
        for index,value in pairs(ImportsFolder.GIFs:GetChildren()) do
            if value:IsA('BoolValue') and value:GetAttribute('IsGif') == true then
                TotalGifCount = TotalGifCount + 1 -- Increase total image count
                
                GIFs[TotalGifCount] = { -- Make new table for gif & its' data

                    -- Frames
                    Frames = {},

                    -- Spritesheet (if enabled)
                    Spritesheet = value:GetAttribute('Spritesheet'),
                    
                        -- Spritesheet Data
                        SFrameSize = nil,

                    -- Default values
                    ImageId = value:GetAttribute('ImageId'), -- Set image ID
                    Name = value:GetAttribute('Name') or 'Image '..TotalImageCount, -- Set image name, or make a name
                    ZIndex = value:GetAttribute('Order') or 0 -- Set iamge order, if any

                }
                
                -- Extract the frames of the GIF
                local FramesFolder, error = pcall(value['GIF-Frames']) -- Determine if a folder is accessible

                if FramesFolder then -- If frame folder is found, compile frames
                    local GifFrames = value['GIF-Frames']:GetChildren() -- Gets a table of the frames in the folder

                    for FrameNum = 1,1,#GifFrames do -- Start a 1 and go through the length of the frames
                        if GifFrames[FrameNum].Value ~= nil and GifFrames[FrameNum]:IsA("NumValue") then -- Make sure hte frame is not invalid
                            GIFs[TotalGifCount][FrameNum]= GifFrames[FrameNum].Value -- Add asset id to frame
                        else
                            table.insert(SetupErrors, value.Name..' could not process frame #'..FrameNum.." properly.")
                        end
                    end
                else
                    table.insert(SetupErrors, value.Name..' does not have frames parented to object.') -- Adds to error list
                    return
                end

                -- Get Spritesheet Frame Size
                if GIFs[TotalGifCount]['Spritesheet'] == true then -- If true, determine the size of the frames
                
                    local SImageSize, SRows, SColumns = value:GetAttribute('SImageSize'), value:GetAttribute('SRows'), value:GetAttribute('SColumns') 

                    if SImageSize ~= nil and SRows ~= nil and SColumns ~= nil then
                        local FrameSize = calculateSpritesheetSize(SImageSize, SRows, SColumns)
                        GIFs[TotalGifCount]['SFrameSize'] = FrameSize
                    else
                        table.insert(SetupErrors, value.Name..' experienced a error in finding the image size.')
                    end
                end
                

            end
        end

        -- Send errors (if any)
        if SetupErrors ~= {} then
            local StringError = ""
            for i,v in pairs(SetupErrors) do
                StringError = StringError..i.."/n"
            end
            sendError(StringError)
        end

        return Images, GIFs
    end

-- Events
function VSULoader.LoadVSU()

    -- Extract Objects
    local Images, GIFs = ExtractFiles() -- Returns images followed by GIFs



end

-- Return Module
return VSULoader