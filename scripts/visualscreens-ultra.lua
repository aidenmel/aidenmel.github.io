--[[

    Visual Screens ULTRA
    A all new way to elevate your visual experience.

    | Developed by
    | iVastz

    | Published by
    | Techo Incorporated

]]--

-- Functions

    -- Spritesheet Functions
    local function calculateSpritesheetSize(ImageSize)
    
        local CalculatedX, CalculatedY = 0,0
        
        if ImageSize.X > 1080 or ImageSize.Y > 1080 then -- Only downsize images if their size exceeds 1080px x 1080px
            if ImageSize.X > ImageSize.Y then -- If 'x' is greater than 'y,' then use simple algebra to downsize Y exactly
                CalculatedX = 1080
                CalculatedY = (1080/ImageSize.X) * ImageSize.Y
            elseif ImageSize.Y > ImageSize.X then
                CalculatedX = (1080/ImageSize.Y) * ImageSize.X
                CalculatedY = 1080
            else ImageSize.X == ImageSize.Y then -- If the sizes are the same, set them to 1080px x 1080px
                CalculatedX = 1080
                CalculatedY = 1080
            end
        else
            CalculatedX = ImageSize.X
            CalculatedY = ImageSize.Y
        end
        
        print(CalculatedX, CalculatedY)
    end
     
-- Events
 local calculateSpritesheetSize(Vector2.new(120,120))
 print(calculateSpritesheetSize)
 