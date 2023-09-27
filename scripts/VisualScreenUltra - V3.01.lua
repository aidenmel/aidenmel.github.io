--[[

    Visual Screens ULTRA | CoreScripts
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

    local BaseFolder = script.Parent.Parent

    -- Modules
    local SettingsModule = require(BaseFolder:WaitForChild('Settings'))
    local LoadModule = nil

-- Functions
    
    -- Setup Functions
    

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
    
-- Events
-- if HTTPServiceRequest == 'Accepted' then
--    LoadModule.BeginSetup()
-- end




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

-- Functions

    -- Extract Images & GIFs
    local function ExtractFiles()
        
        -- Variables
        local Images = {}
        local GIFs = {}
        
        local TotalImageCount = 0
        local TotalGifCount = 0
        
        -- Extract Images
        for index,v in pairs(SettingsModule.Imports.Images:GetChildren()) do
           
           if index:IsA('BoolValue') and index:GetAttribute('ImageId') ~= nil then
               TotalImageCount == TotalImageCount + 1 -- Increase total image count
               
               Images[TotalImageCount] = { -- Make new table for image
                   ImageId = index:GetAttribute('ImageId'), -- Set image ID
                   Name = index:GetAttribute('ImageName') or 'Image '..TotalImageCount, -- Set image name, or make a name
                   ZIndex = index:GetAttribute('Order') or 0 -- Set iamge order, if any
               }
           end
            
        end
        
    end